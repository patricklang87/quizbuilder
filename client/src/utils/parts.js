import axios from 'axios';
import { tokenConfig } from './auth';

export const addQuizPart = async (data) => {
    try {
        const response = await axios.post('/api/parts', data, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteQuizPart = async (part_id) => {
    try {
        const response = await axios.delete(`/api/parts/${part_id}`, tokenConfig());
        return response;
    } catch (error) {   
        console.log(error);
    }
}

export const editQuizPart = async (data) => {
    try {
        const response = await axios.put(`/api/parts/`, data, tokenConfig());
        return response;
    } catch (error) {   
        console.log(error);
    }
}


export const getQuizParts = async (quizId) => {
    try {
        const response = await axios.get(`/api/parts/${quizId}`, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getPartsNoAnswers = async (quiz_id) => {
    try {
        const response = await axios.get(`/api/parts/takeQuiz/${quiz_id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}