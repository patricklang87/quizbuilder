import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userRedux';
import questionReducer from './questionRedux';
import editQuizReducer from './editQuizRedux';
import takeQuizReducer from './takeQuizRedux';
import viewResultsReducer from './viewResultsRedux';

export default configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
        editQuiz: editQuizReducer,
        takeQuiz: takeQuizReducer,
        viewResults: viewResultsReducer
    }
});