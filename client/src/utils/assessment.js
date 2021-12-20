import axios from 'axios';
import { tokenConfig } from './auth';


//Post a question
export const assessQuiz = async (data) => {
    try {
        const response = await axios.post('/api/assessment', data, tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}

//get user assessments
export const getUserAssessments = async () => {
    try {
        const response = await axios.get('/api/assessment', tokenConfig());
        return response;
    } catch (error) {
        console.log(error);
    }
}