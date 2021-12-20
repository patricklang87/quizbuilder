import axios from 'axios';
import { tokenConfig } from './auth';

//Post a quiz
export const postQuiz = async (data) => {
    try {
        const response = await axios.post('/api/quizzes', data, tokenConfig());
        return response;
    } catch (err) {
        console.log(err)
    }
}

export const addQuizQuestion = async (data) => {
    try {
        const response = await axios.put('/api/quizzes', data, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const deleteQuiz = async (quizId) => {
    try {
        const response = await axios.delete(`/api/quizzes/${quizId}`, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getQuizzesDesigned = async () => {
    try {
        const response = await axios.get('/api/quizzes/designed', tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllQuizzes = async () => {
    try {
        const response = await axios.get('/api/quizzes/all');
        return response;
    } catch (error) {
        console.log(error);
    }
}

