import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
    name: "question",
    initialState: {
        myQuestions: {}
    },
    reducers: {
        setMyQuestions: (state, action) => {
            for (let question of action.payload) {
                state.myQuestions[question.id] = question;
            }
        },
        removeMyQuestions: (state) => {
            state.myQuestions = {};
        },
        addMyQuestion: (state, action) => {
            state.myQuestions[action.payload.id] = action.payload;
        },
        removeMyQuestion: (state, action) => {
            const newQuestionList = state.myQuestions;
            delete newQuestionList[action.payload];
            state.myQuestions = newQuestionList;
        }
        
    }
});

export const { setMyQuestions, removeMyQuestions, addMyQuestion, removeMyQuestion } = questionSlice.actions;
export default questionSlice.reducer;