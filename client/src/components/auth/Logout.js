import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCurrentUser } from '../../redux/userRedux';
import { removeAllEditQuiz } from '../../redux/editQuizRedux';
import { removeAllTakeQuiz } from '../../redux/takeQuizRedux';
import { removeAllResults } from '../../redux/viewResultsRedux';
import { removeMyQuestions } from '../../redux/questionRedux';

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('quizbuilder_token');
        dispatch(removeCurrentUser());
        dispatch(removeMyQuestions());
        dispatch(removeAllEditQuiz());
        dispatch(removeAllTakeQuiz());
        dispatch(removeAllResults());
        navigate('/');
    }

    return (
        <>
          <button className="nav-link" onClick={logout}>Logout</button>  
        </>
    )
}
