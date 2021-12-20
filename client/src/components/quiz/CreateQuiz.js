
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postQuiz } from '../../utils/quizzes'; 
import { setQuiz } from '../../redux/editQuizRedux';
import { useNavigate } from 'react-router-dom';
import { addQuizDesigned } from '../../redux/userRedux';

export default function CreateQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [course, setCourse] = useState('');
    const [culturalTopic, setCulturalTopic] = useState('');
    const [grammarTopic, setGrammarTopic] = useState('');
    const [info, setInfo] = useState('');

    const createBtnClass = (title.length > 0) ? 'btn-primary' : "btn-primary btn-inactive";

    const handleCreate = async () => {
        if (title === '') {
            setInfo('Your quiz must have a title.');
            return;
        }

        const data = {title, language, course, culturalTopic, grammarTopic};
        try {
            const response = await postQuiz(data);
            dispatch(setQuiz(response.data));
            dispatch(addQuizDesigned(response.data));
            navigate('/dashboard/editQuiz');
        } catch (error) {
            console.log(error);
            setInfo("Something went wrong. Please try again soon.");
            
        }
        
    }

    return (
        <div className="container">
            <h1>New Quiz</h1>
            <p className="alert-text">{info}</p>
            <label htmlFor="quizTitle">Title</label><br />
            <input type="text" id="quizTitle" name="quizTitle" onChange={(e) => setTitle(e.target.value)}/> <br />
            <label htmlFor="quizLanguage" >Language</label><br />
            <input type="text" id="quizLanguage" name="quizLanguage" onChange={(e) => setLanguage(e.target.value)} /> <br />
            <label htmlFor="quizLanguage" >Cultural Topic</label><br />
            <input type="text" id="quizLanguage" name="quizLanguage" onChange={(e) => setCulturalTopic(e.target.value)} /> <br />
            <label htmlFor="quizLanguage" >Grammatical Topic</label><br />
            <input type="text" id="quizLanguage" name="quizLanguage" onChange={(e) => setGrammarTopic(e.target.value)} /> <br />
            <label htmlFor="intendedCourse">Course</label> <br />
            <input type="text" id="intendedCourse" name="intendedCourse" onChange={(e) => setCourse(e.target.value)} /> <br />
            <button className={createBtnClass} onClick={handleCreate}>Create Quiz</button> 
        </div>
    )
}