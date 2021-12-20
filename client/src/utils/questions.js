import axios from 'axios';
import { tokenConfig } from './auth';

//Post a question
export const postQuestion = async (data) => {
    try {
        const response = await axios.post('/api/questions', data, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateQuestion = async (data) => {
    try {
        const response = await axios.put('/api/questions', data, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

//Get all user questions
export const getUserQuestions = async () => {
    try {
        const response = await axios.get('/api/questions', tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Delete a question 
export const deleteQuestion = async (questionId) => {
    try {
        const response = await axios.delete(`/api/questions/${questionId}`, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

//for alternate names for question types
export const questionTypes = {
    MC: {
        short: "MC",
        long: "Multiple Choice"
    },
    TF: {
        short: "TF",
        long: "True/False"
    },
    FB: {
        short: "FB",
        long: "Fill in the Blank"
    }
}