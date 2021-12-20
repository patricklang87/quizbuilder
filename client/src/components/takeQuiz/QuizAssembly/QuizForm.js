import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizPart from './QuizPart';
import { assessQuiz } from '../../../utils/assessment';
import { setResult } from '../../../redux/takeQuizRedux';

export default function QuizForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const title = useSelector(state => state.takeQuiz.title);
    const creator_fn  = useSelector(state => state.takeQuiz.creator_first_name);
    const creator_ln = useSelector(state => state.takeQuiz.creator_last_name);
    const parts = useSelector(state => state.takeQuiz.parts);
    const numQuestions = useSelector(state => state.takeQuiz.numQuestions);

    const [responses, setResponses] = useState([]);

    const allQuestionsAnswered = numQuestions === responses.length;

    const addResponse = (newRes) => {
        const resIndex = responses.findIndex((res) => {
            return res.id === newRes.id;
        });

        console.log(newRes.id)

        if (resIndex === -1) {
            setResponses([...responses, newRes])
        } else {
            const newResponses = [...responses]
            newResponses[resIndex] = newRes;
            setResponses(newResponses);
        }
    }

    const handleSubmit = async () => {
        if (!allQuestionsAnswered) {
            console.log("Please answer all questions")
            return;
        } else {
            try {
                const response = await assessQuiz(responses);
                dispatch(setResult(response.data));
                navigate('/assessmentDash/resultsForm');
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    const partsList = [...parts].sort((a, b) => {
        return a.quiz_pos - b.quiz_pos;
    }).map(part => {
        return <QuizPart part={part} addResponse={addResponse} />;
    });

    return (
        <div className="container">
            <h1>{title}</h1>
            <p>{creator_fn} {creator_ln}</p>
            <div>
                {partsList}
            </div>
            <button
                className={allQuestionsAnswered ? "btn btn-primary" : "btn btn-inactive"}
                onClick={handleSubmit}>
                Submit Quiz
            </button>
            <button className="btn btn-caution">Leave Quiz</button>
        </div>
        
    )
}
