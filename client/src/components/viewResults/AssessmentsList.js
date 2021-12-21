//Currently this portion of the webapp only shows grades. After a reorganization of the backend, I may update it to 
// allow views of the entire quiz
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAssessments, getOneAssessment } from '../../utils/assessment';
// import { getPartsNoAnswers } from '../../utils/parts';
import { setCurrentQuiz, setResult } from '../../redux/takeQuizRedux';
import { setAssessments } from '../../redux/viewResultsRedux';
import { useNavigate } from 'react-router';
import { BsXCircle } from 'react-icons/bs';


export default function AssessmentsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const assessments = useSelector(state => state.viewResults.assessments);
    const [titleTerm, setTitleTerm] = useState('');
    const [languageTerm, setLanguageTerm] = useState('');
    const [topicTerm, setTopicTerm] = useState('');
    const [courseTerm, setCourseTerm] = useState('');
    const [dateTerm, setDateTerm] = useState('');
    const [creatorTerm, setCreatorTerm] = useState('');

    useEffect(() => {
        const getCompletedAssessments = async () => {
            const response = await getUserAssessments();
            dispatch(setAssessments(response.data));
        }

        if (assessments.length === 0) {
            getCompletedAssessments();
        }
    }, []);

    const handleClick = async (assessment) => {
        try {
            const response = await getOneAssessment(assessment.id);
            console.log("building past score view", response.data);
            const parts = response.data.parts;
            const questions = response.data.questions
            console.log(questions);
            parts.forEach(part => {
                part['questions'] = [];
                questions.forEach(question => {
                    if (question.part_id === part.id) {
                        part['questions'].push(question);
                    }
                });
            });
            const numQuestions = questions.length;
            dispatch(setCurrentQuiz({...assessment, parts, numQuestions}));
            dispatch(setResult(assessment));
            navigate('/assessmentDash/resultsForm');
        } catch (error) {
            console.log(error);
        }
    }

    const assessmentsSorted = [...assessments].sort((a, b) => {
        let da = new Date(a.created_at);
        let db = new Date(b.created_at);
        return db - da;
    });

    const assessmentsFiltered = assessmentsSorted
        .filter(assessment => {
            return assessment.title.toLowerCase().includes(titleTerm.toLowerCase());
        }).filter(assessment => {
            return assessment.language.toLowerCase().includes(languageTerm.toLowerCase());
        }).filter(assessment => {
            return assessment.cultural_topic.toLowerCase().includes(topicTerm.toLowerCase());
        }).filter(assessment => {
            return assessment.course.toLowerCase().includes(courseTerm.toLowerCase());
        }).filter(assessment => {
            const date = new Date(assessment.taken_at).toLocaleString();
            return date.toLowerCase().includes(dateTerm.toLowerCase());
        }).filter(assessment => {
            const creatorTerms = creatorTerm.toLowerCase().split(' ');
            let contains = false;
            creatorTerms.forEach(term => {
                if (assessment.first_name.toLowerCase().includes(term) || assessment.last_name.toLowerCase().includes(term) ) {
                    contains = true
                }
            });
            return contains;
        })

    const assessmentsList = assessmentsFiltered.map((assessment) => {
        return (
            <tr key={`${assessment.taken_at} ${assessment.user_id}`} 
            // className="list-item-selectable"
            className="list-item"
            // onClick={() => handleClick(assessment)}
            >
                <td><h4>{assessment.title}</h4></td>
                <td>{assessment.score}</td>
                <td>{assessment.language}</td>
                <td>{assessment.cultural_topic}</td>
                <td>{assessment.course}</td>
                <td>{new Date(assessment.taken_at).toLocaleString()}</td>
                <td>{assessment.first_name} {assessment.last_name}</td>
            </tr>
        );
    });

    return (
        <div className="container">
            <h1>Select an assessment...</h1>
            <table className="standard-table">
                <tbody>
                    <tr>
                        <td><h2>Quiz Title</h2></td>
                        <td><h2>Score</h2></td>
                        <td><h2>Language</h2></td>
                        <td><h2>Cultural Topics</h2></td>
                        <td><h2>Course</h2></td>
                        <td><h2>Taken at</h2></td>
                        <td><h2>Creator</h2></td>
                    </tr>
                    <tr>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setTitleTerm(e.target.value)} value={titleTerm} className="table-input" placeholder="Search by Title" />
                                <BsXCircle className="xIcon" onClick={() => setTitleTerm('')}/>
                            </div>
                        </td>
                        <td>
                            {/* <div className="td-input">
                                <input onChange={(e) => setTitleTerm(e.target.value)} value={titleTerm} className="table-input" placeholder="Search by Title" />
                                <BsXCircle className="xIcon" onClick={() => setTitleTerm('')}/>
                            </div> */}
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setLanguageTerm(e.target.value)} value={languageTerm} className="table-input" placeholder="...Language"/>
                                <BsXCircle className="xIcon" onClick={() => setLanguageTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setTopicTerm(e.target.value)} value={topicTerm} className="table-input" placeholder="...Topic"/>
                                <BsXCircle className="xIcon" onClick={() => setTopicTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setCourseTerm(e.target.value)} value={courseTerm} className="table-input" placeholder="...Course"/>
                                <BsXCircle className="xIcon" onClick={() => setCourseTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setDateTerm(e.target.value)} value={dateTerm} className="table-input" placeholder="...Creation Date"/>
                                <BsXCircle className="xIcon" onClick={() => setDateTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setCreatorTerm(e.target.value)} value={creatorTerm} className="table-input" placeholder="...Creator Name"/>
                                <BsXCircle className="xIcon" onClick={() => setCreatorTerm('')}/>
                            </div>
                        </td>
                    </tr>
                    {assessmentsList}
                </tbody>
            </table>
        </div>
    )
}
