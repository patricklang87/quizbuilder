process.env.JWT_SECRET = 'test-secret';

const express = require('express');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../db', () => ({ query: jest.fn() }));
const pool = require('../db');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/users', require('../routes/users'));
  app.use('/api/auth', require('../routes/auth'));
  app.use('/api/quizzes', require('../routes/quizzes'));
  app.use('/api/assessment', require('../routes/assessment'));
  return app;
};

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// Route each SQL statement to a handler so tests can describe the database.
const fakeDb = (handlers) => {
  pool.query.mockImplementation(async (sql, params) => {
    const match = Object.keys(handlers).find((prefix) => sql.startsWith(prefix));
    if (!match) throw new Error(`Unexpected query: ${sql}`);
    return handlers[match](params);
  });
};

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

describe('auth middleware', () => {
  it('rejects requests without a token', async () => {
    await request(buildApp()).get('/api/quizzes/designed').expect(401);
    expect(pool.query).not.toHaveBeenCalled();
  });

  it('rejects invalid tokens', async () => {
    await request(buildApp()).get('/api/quizzes/designed').set('x-auth-token', 'bad').expect(400);
  });
});

describe('POST /api/users (register)', () => {
  it('requires every field', async () => {
    const res = await request(buildApp()).post('/api/users').send({ email: 'a@b.com' });
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Please enter all fields');
  });

  it('stores a hashed password', async () => {
    fakeDb({
      'INSERT INTO users': ([first, last, password, email]) => ({
        rows: [{ id: 1, first_name: first, last_name: last, password, email }],
      }),
    });
    const res = await request(buildApp())
      .post('/api/users')
      .send({ first_name: 'Ada', last_name: 'Lovelace', email: 'a@b.com', password: 'pw' });

    expect(res.status).toBe(200);
    const storedPassword = pool.query.mock.calls[0][1][2];
    expect(storedPassword).not.toBe('pw');
    expect(bcrypt.compareSync('pw', storedPassword)).toBe(true);
  });

  it('explains when the email is already registered', async () => {
    fakeDb({
      'INSERT INTO users': () => {
        throw Object.assign(new Error('duplicate'), { constraint: 'users_email_key' });
      },
    });
    const res = await request(buildApp())
      .post('/api/users')
      .send({ first_name: 'Ada', last_name: 'Lovelace', email: 'a@b.com', password: 'pw' });
    expect(res.body.msg).toMatch(/already associated/);
  });
});

describe('POST /api/auth (login)', () => {
  const user = { id: 7, email: 'a@b.com', first_name: 'Ada', password: bcrypt.hashSync('correct', 4) };

  it('requires email and password', async () => {
    const res = await request(buildApp()).post('/api/auth').send({ email: 'a@b.com' });
    expect(res.status).toBe(400);
  });

  it('rejects unknown emails', async () => {
    fakeDb({ 'SELECT * FROM users': () => ({ rows: [] }) });
    const res = await request(buildApp()).post('/api/auth').send({ email: 'x@b.com', password: 'pw' });
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Invalid credentials.');
  });

  it('rejects a wrong password', async () => {
    fakeDb({ 'SELECT * FROM users': () => ({ rows: [{ ...user }] }) });
    const res = await request(buildApp()).post('/api/auth').send({ email: 'a@b.com', password: 'nope' });
    expect(res.status).toBe(400);
  });

  it('returns a token and the user without the password hash', async () => {
    fakeDb({ 'SELECT * FROM users': () => ({ rows: [{ ...user }] }) });
    const res = await request(buildApp()).post('/api/auth').send({ email: 'a@b.com', password: 'correct' });
    expect(res.status).toBe(200);
    expect(jwt.verify(res.body.token, process.env.JWT_SECRET).id).toBe(7);
    expect(res.body.user).toEqual({ id: 7, email: 'a@b.com', first_name: 'Ada' });
  });
});

describe('quizzes', () => {
  it("lists only the signed-in user's quizzes", async () => {
    fakeDb({ 'SELECT * FROM quizzes WHERE creator_id': () => ({ rows: [{ id: 1, title: 'Verbs' }] }) });
    const res = await request(buildApp()).get('/api/quizzes/designed').set('x-auth-token', tokenFor(7));
    expect(res.body).toEqual([{ id: 1, title: 'Verbs' }]);
    expect(pool.query.mock.calls[0][1]).toEqual([7]);
  });

  it('creates a quiz owned by the signed-in user', async () => {
    fakeDb({ 'INSERT INTO quizzes': (params) => ({ rows: [{ id: 3, creator_id: params[0], title: params[1] }] }) });
    const res = await request(buildApp())
      .post('/api/quizzes')
      .set('x-auth-token', tokenFor(7))
      .send({ title: 'Verbs', language: 'German' });
    expect(res.body).toEqual({ id: 3, creator_id: 7, title: 'Verbs' });
  });
});

describe('POST /api/assessment (grading)', () => {
  const answerKey = [
    {
      id: 1,
      question_type: 'MC',
      total_responses: null,
      correct_responses: null,
      body: { responses: [{ text: 'Berlin', correct: true }, { text: 'Bonn', correct: false }] },
    },
    {
      id: 2,
      question_type: 'FB',
      total_responses: 4,
      correct_responses: 3,
      body: { responses: [{ text: 'ging', correct: true }, { text: 'lief', correct: true }] },
    },
    {
      id: 3,
      question_type: 'TF',
      total_responses: 10,
      correct_responses: 5,
      body: { responses: [{ text: 'true', correct: true }, { text: 'false', correct: false }] },
    },
    {
      id: 4,
      question_type: 'MC',
      total_responses: 2,
      correct_responses: 2,
      body: { responses: [{ text: 'der', correct: true }, { text: 'die', correct: false }] },
    },
  ];

  const grade = async (quizStats, submission) => {
    const updates = [];
    let saved;
    fakeDb({
      'SELECT * FROM questions': () => ({ rows: answerKey }),
      'UPDATE questions': (params) => {
        updates.push(params);
        return { rows: [] };
      },
      'SELECT average_score': () => ({ rows: [quizStats] }),
      'UPDATE quizzes': (params) => {
        updates.push(['quiz', ...params]);
        return { rows: [] };
      },
      'INSERT INTO submissions': (params) => {
        saved = params;
        return { rows: [{ id: 99, score: params[1] }] };
      },
    });
    const res = await request(buildApp())
      .post('/api/assessment')
      .set('x-auth-token', tokenFor(7))
      .send(submission);
    return { res, updates, saved };
  };

  const submission = [
    { quiz_id: 5, id: 1, response: 'Berlin' }, // correct
    { quiz_id: 5, id: 2, response: 'lief' }, // correct (any accepted answer)
    { quiz_id: 5, id: 3, response: 'false' }, // wrong
    { quiz_id: 5, id: 4, response: 'die' }, // wrong
  ];

  it('scores each response against the answer key', async () => {
    const { res, saved } = await grade({ average_score: null, total_submissions: null }, submission);

    expect(res.body).toEqual({ id: 99, score: 50 });
    const [quizId, percentage, , userId, results] = saved;
    expect(quizId).toBe(5);
    expect(percentage).toBe(50);
    expect(userId).toBe(7);
    expect(results[1]).toEqual({ mark: true, res: 'Berlin', key: ['Berlin'] });
    expect(results[2]).toEqual({ mark: true, res: 'lief', key: ['ging', 'lief'] });
    expect(results[3].mark).toBe(false);
    expect(results[4].mark).toBe(false);
  });

  it("updates each question's response statistics", async () => {
    const { updates } = await grade({ average_score: null, total_submissions: null }, submission);
    expect(updates.slice(0, 4)).toEqual([
      [1, 1, 1], // first ever response, correct
      [5, 4, 2], // correct
      [11, 5, 3], // wrong
      [3, 2, 4], // wrong
    ]);
  });

  it('sets the first average and then keeps a running average', async () => {
    let { updates } = await grade({ average_score: null, total_submissions: null }, submission);
    expect(updates.at(-1)).toEqual(['quiz', 50, 1, 5]);

    // pg returns DECIMAL columns as strings
    ({ updates } = await grade({ average_score: '80.00', total_submissions: 3 }, submission));
    expect(updates.at(-1)).toEqual(['quiz', 72.5, 4, 5]);
  });
});
