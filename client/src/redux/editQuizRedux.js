import { createSlice } from '@reduxjs/toolkit';

export const editQuizSlice = createSlice({
    name: "editQuiz",
    initialState: {
        quizId: null,
        title: '',
        grammarTopic: '',
        culturalTopic: '',
        course: '',
        language: '',
        parts: [],
        questions: [],
    },
    reducers: {
        setQuiz: (state, action) => {
            let data = action.payload;
            state.title = data.title;
            state.grammarTopic = data.grammar_topic;
            state.culturalTopic = data.cultural_topic;
            state.course = data.course;
            state.language = data.language;
            state.questions = data.questions;
            state.quizId = data.id;
        },
        setRenderedQuestions: (state, action) => {
            state.renderedQuestions = action.payload;
        },
        updateField: (state, action) => {
            let field = action.payload.field;
            let value = action.payload.value;
            state[field] = value;
        },
        addQuestion: (state, action) => {
            const id = action.payload.id;
            state.questions = [...state.questions, action.payload.id];
            state.questionsRendered[id] = [...state.questions, action.payload];
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter(question => { return question !== action.payload});
            state.questionsRendered = state.questions.filter(question => {return question.id !== action.payload});
        },
        editQuestion: (state, action) => {
            let id = action.payload.id;
            state.renderedQuestions[id] = action.payload;
        },
        savePart: (state) => {
            state.parts = [...state.parts, {}];
        },
        editPart: (state, action) => {
            if (!state.parts[action.payload.index]['title']) {
                state.parts[action.payload.index] = action.payload.data;
            } else {
                state.parts[action.payload.index]['title'] = action.payload.data.title;
                state.parts[action.payload.index]['instructions'] = action.payload.data.instructions;
            }
        },
        setParts: (state, action) => {
            state.parts = action.payload;
        },
        removePart: (state, action) => {
            state.parts = state.parts.filter(part => {
                return part.id !== action.payload;
            })
        },
        addQuizQuestion: (state, action) => {
            state.parts.forEach(part => {
                if (part.id === action.payload.part_id) {
                    if (!part['questions']) {
                        part['questions'] = [];
                    }
                    part['questions'] = [...part['questions'], action.payload];
                }
            })
        },
        updateQuizQuestion: (state, action) => {
            state.parts.forEach(part => {
                if (part.id === action.payload.part_id) {
                    part.questions = part.questions.map((question) => {
                        return question.id === action.payload.id
                            ? action.payload
                            : question
                    });
                }
            })
        },
        removeQuizQuestion: (state, action) => {
            state.parts.forEach(part => {
                if (part.id === action.payload.partId) {
                    part.questions = part.questions.filter(question => {
                        return question.id !== action.payload.questionId
                    });
                }
            });
        },
        removeAllEditQuiz: (state) => {
            state.quizId = null;
            state.title = '';
            state.grammarTopic = '';
            state.culturalTopic = '';
            state.course = '';
            state.language = '';
            state.parts = [];
            state.questions = [];
        }
        
        
    }
});

export const { setQuiz, setRenderedQuestions, updateField, addQuestion, removeQuestion, editQuestion, savePart, editPart, addQuizQuestion, setParts, removePart, updateQuizQuestion, removeQuizQuestion, removeAllEditQuiz } = editQuizSlice.actions;
export default editQuizSlice.reducer;