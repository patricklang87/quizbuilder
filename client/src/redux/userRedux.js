import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: localStorage.getItem('quizbuilder_token'),
        isAuthenticated: null,
        isLoading: false,
        firstName: null,
        lastName: null,
        email: null,
        quizzesDesigned: [],

    },
    reducers: {
        setUserLoading: (state, action
            ) => {
            state.isLoading = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.firstName = action.payload.user.first_name;
            state.lastName = action.payload.user.last_name;
            state.email = action.payload.user.email;
            state.quizzesDesigned = action.payload.user.quizzes_designed || [];
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        },
        removeCurrentUser: (state) => {
            state.token = null;
            state.isAuthenticated = null;
            state.isLoading = false;
            state.user = null;
            state.quizzesDesigned = [];
            state.firstName = null;
            state.lastName = null;
        },
        setQuizzesDesigned: (state, action) => {
            state.quizzesDesigned = action.payload;
        },
        addQuizDesigned: (state, action) => {
            state.quizzesDesigned = [action.payload, ...state.quizzesDesigned];
        },
        removeQuizDesigned: (state, action) => {
            state.quizzesDesigned = state.quizzesDesigned.filter(quiz => {
                return quiz.id !== action.payload;
            })
        }
    }
});

export const { setUserLoading, setCurrentUser, removeCurrentUser, setQuizzesDesigned, addQuizDesigned, removeQuizDesigned} = userSlice.actions;
export default userSlice.reducer;