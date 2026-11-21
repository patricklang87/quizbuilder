import questionReducer, {
  setMyQuestions,
  addMyQuestion,
  removeMyQuestion,
  removeMyQuestions,
} from '../redux/questionRedux';
import takeQuizReducer, { setCurrentQuiz, setResult, removeAllTakeQuiz } from '../redux/takeQuizRedux';

describe('questionRedux', () => {
  it('indexes questions by id and supports add/remove', () => {
    let state = questionReducer(undefined, setMyQuestions([{ id: 1 }, { id: 2 }]));
    state = questionReducer(state, addMyQuestion({ id: 3 }));
    expect(Object.keys(state.myQuestions)).toEqual(['1', '2', '3']);

    state = questionReducer(state, removeMyQuestion(2));
    expect(Object.keys(state.myQuestions)).toEqual(['1', '3']);

    state = questionReducer(state, removeMyQuestions());
    expect(state.myQuestions).toEqual({});
  });
});

describe('takeQuizRedux', () => {
  it('loads a quiz with its creator and clears it afterwards', () => {
    let state = takeQuizReducer(
      undefined,
      setCurrentQuiz({
        id: 5,
        title: 'Verbs',
        grammar_topic: 'Perfekt',
        cultural_topic: 'Wien',
        course: 'GER 101',
        language: 'German',
        parts: [{ id: 1 }],
        first_name: 'Ada',
        last_name: 'Lovelace',
        numQuestions: 4,
      })
    );
    expect(state).toMatchObject({
      quizId: 5,
      grammarTopic: 'Perfekt',
      creator_first_name: 'Ada',
      creator_last_name: 'Lovelace',
      numQuestions: 4,
    });

    state = takeQuizReducer(state, setResult({ score: 75 }));
    expect(state.result).toEqual({ score: 75 });

    state = takeQuizReducer(state, removeAllTakeQuiz());
    expect(state.quizId).toBeNull();
    expect(state.result).toBeNull();
    expect(state.parts).toEqual([]);
  });
});
