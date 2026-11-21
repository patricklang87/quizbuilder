import reducer, {
  setQuiz,
  updateField,
  savePart,
  editPart,
  setParts,
  removePart,
  addQuizQuestion,
  updateQuizQuestion,
  removeQuizQuestion,
  removeAllEditQuiz,
} from '../redux/editQuizRedux';

describe('editQuizRedux', () => {
  it('maps a quiz from the API into editor state', () => {
    const state = reducer(
      undefined,
      setQuiz({
        id: 4,
        title: 'Verbs',
        grammar_topic: 'Präteritum',
        cultural_topic: 'Berlin',
        course: 'GER 102',
        language: 'German',
        questions: [1, 2],
      })
    );
    expect(state).toMatchObject({
      quizId: 4,
      title: 'Verbs',
      grammarTopic: 'Präteritum',
      culturalTopic: 'Berlin',
      course: 'GER 102',
      language: 'German',
      questions: [1, 2],
    });
  });

  it('updates a single field', () => {
    const state = reducer(undefined, updateField({ field: 'title', value: 'Nouns' }));
    expect(state.title).toBe('Nouns');
  });

  it('adds a blank part, fills it in, then edits its title and instructions', () => {
    let state = reducer(undefined, savePart());
    state = reducer(state, editPart({ index: 0, data: { id: 9, title: 'Part 1', instructions: 'Read' } }));
    expect(state.parts).toEqual([{ id: 9, title: 'Part 1', instructions: 'Read' }]);

    state = reducer(state, editPart({ index: 0, data: { id: 'ignored', title: 'Part A', instructions: 'Write' } }));
    expect(state.parts).toEqual([{ id: 9, title: 'Part A', instructions: 'Write' }]);
  });

  it('adds, updates and removes questions within the right part', () => {
    let state = reducer(undefined, setParts([{ id: 1 }, { id: 2 }]));
    state = reducer(state, addQuizQuestion({ id: 10, part_id: 2, body: 'old' }));
    state = reducer(state, addQuizQuestion({ id: 11, part_id: 2, body: 'other' }));
    expect(state.parts[0].questions).toBeUndefined();
    expect(state.parts[1].questions.map((q) => q.id)).toEqual([10, 11]);

    state = reducer(state, updateQuizQuestion({ id: 10, part_id: 2, body: 'new' }));
    expect(state.parts[1].questions[0].body).toBe('new');

    state = reducer(state, removeQuizQuestion({ partId: 2, questionId: 10 }));
    expect(state.parts[1].questions.map((q) => q.id)).toEqual([11]);
  });

  it('removes a part and resets the editor', () => {
    let state = reducer(undefined, setParts([{ id: 1 }, { id: 2 }]));
    state = reducer(state, removePart(1));
    expect(state.parts).toEqual([{ id: 2 }]);

    state = reducer(state, updateField({ field: 'title', value: 'Verbs' }));
    state = reducer(state, removeAllEditQuiz());
    expect(state.title).toBe('');
    expect(state.parts).toEqual([]);
  });
});
