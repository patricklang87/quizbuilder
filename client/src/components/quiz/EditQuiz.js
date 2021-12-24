import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateQuizPart from './CreateQuizPart';
import { savePart, setParts } from '../../redux/editQuizRedux';
import { getQuizParts } from '../../utils/parts';

export default function EditQuiz() {
    const dispatch = useDispatch();
    const quizId = useSelector(state => state.editQuiz.quizId)
    const title = useSelector(state => state.editQuiz.title);
    const language = useSelector(state => state.editQuiz.language);
    const course = useSelector(state => state.editQuiz.course);
    const grammarTopic = useSelector(state => state.editQuiz.grammarTopic);
    const culturalTopic = useSelector(state => state.editQuiz.culturalTopic);
    const parts = useSelector(state => state.editQuiz.parts);

    useEffect(() => {
        const renderParts = async (quizId) => {
            if (parts.length === 0) {
                const response = await getQuizParts(quizId);
                console.log("EditQuiz 21", response);
                const parts = response.data.parts;
                const questions = response.data.questions;
                parts.forEach(part => {
                    const partQuestions = questions.filter(question => {
                        return question.part_id === part.id;
                    });
                    part['questions'] = partQuestions;
                });

                dispatch(setParts(parts));
            }    
        }

        renderParts(quizId);
    }, []);

    const handleAddPart = () => {
        dispatch(savePart());
    }

    const quizParts = [...parts].sort((a, b) => {
        return a.quiz_pos - b.quiz_pos
    }).map((part, index) => {
        return (
            <CreateQuizPart part={part} index={index} />
        );
    });

    return (
        <div className="container">
            <div>
                <div className="container-lo">
                <label>Title:</label>
                <h2>{title || "Example Quiz"}</h2>
                </div>
                <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "start"}}>
                    <div className="container-lo">
                        <label>Language:</label>
                        <p>{language || "None given"}</p>
                    </div>
                    <div className="container-lo">
                        <label>Course:</label>
                        <p>{course || "None given"}</p>
                    </div>
                    <div className="container-lo">
                        <label>Grammatical Topic:</label>
                        <p>{grammarTopic || "None given"}</p>
                    </div>
                    <div className="container-lo">
                        <label>Cultural Topic:</label>
                        <p>{culturalTopic || "None given"}</p> 
                    </div>
                </div>
            </div>
            <div className="container">
                <div>
                    {quizParts}
                </div>
                <button className="btn btn-primary" onClick={handleAddPart} >Add Part</button>
            </div>
            

        </div>
    )
}
