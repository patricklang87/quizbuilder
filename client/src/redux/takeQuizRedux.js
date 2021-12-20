import { createSlice } from '@reduxjs/toolkit';

export const takeQuizSlice = createSlice({
    name: "takeQuiz",
    initialState: {
        quizzes: [],
        quizId: null,
        title: '',
        grammarTopic: '',
        culturalTopic: '',
        course: '',
        language: '',
        numQuestions: null,
        creator_first_name: '',
        creator_last_name: '',
        parts: [],
        responses: [],
        result: null
    },
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        setCurrentQuiz: (state, action) => {
            let data = action.payload;
            state.title = data.title;
            state.grammarTopic = data.grammar_topic;
            state.culturalTopic = data.cultural_topic;
            state.course = data.course;
            state.language = data.language;
            state.parts = data.parts;
            state.quizId = data.id;
            state.creator_first_name = data.first_name;
            state.creator_last_name = data.last_name;
            state.numQuestions = data.numQuestions;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        removeAllTakeQuiz: (state) => {
            state.quizzes = [];
            state.quizId = null;
            state.title = '';
            state.grammarTopic = '';
            state.culturalTopic = '';
            state.course = '';
            state.language = '';
            state.numQuestions = null;
            state.creator_first_name = '';
            state.creator_last_name = '';
            state.parts = [];
            state.responses = [];
            state.result = null;
        }
    }
});

export const { setQuizzes, setCurrentQuiz, setResult, removeAllTakeQuiz } = takeQuizSlice.actions;
export default takeQuizSlice.reducer;