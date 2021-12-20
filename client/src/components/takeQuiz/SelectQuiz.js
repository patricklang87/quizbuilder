import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuizzes } from '../../utils/quizzes';
import { getPartsNoAnswers } from '../../utils/parts';
import { setQuizzes, setCurrentQuiz } from '../../redux/takeQuizRedux';
import { useNavigate } from 'react-router';
import { BsXCircle } from 'react-icons/bs';


export default function SelectQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzes = useSelector(state => state.takeQuiz.quizzes);
    const [titleTerm, setTitleTerm] = useState('');
    const [languageTerm, setLanguageTerm] = useState('');
    const [topicTerm, setTopicTerm] = useState('');
    const [courseTerm, setCourseTerm] = useState('');
    const [dateTerm, setDateTerm] = useState('');
    const [creatorTerm, setCreatorTerm] = useState('');

    useEffect(() => {
        const getQuizzes = async () => {
            const response = await getAllQuizzes();
            console.log(response.data, "all quizzes");
            dispatch(setQuizzes(response.data));
        }

        if (quizzes.length === 0) {
            getQuizzes();
        }
    }, []);

    const handleClick = async (quiz) => {
        console.log(quiz);
        try {
            const response = await getPartsNoAnswers(quiz.id);
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
            dispatch(setCurrentQuiz({...quiz, parts, numQuestions}));
            navigate('/assessmentDash/quizForm');
        } catch (error) {
            console.log(error);
        }
    }

    const quizzesSorted = [...quizzes].sort((a, b) => {
        let da = new Date(a.created_at);
        let db = new Date(b.created_at);
        return db - da;
    });

    const quizzesFiltered = quizzesSorted
        .filter(quiz => {
            return quiz.title.toLowerCase().includes(titleTerm.toLowerCase());
        }).filter(quiz => {
            return quiz.language.toLowerCase().includes(languageTerm.toLowerCase());
        }).filter(quiz => {
            return quiz.cultural_topic.toLowerCase().includes(topicTerm.toLowerCase());
        }).filter(quiz => {
            return quiz.course.toLowerCase().includes(courseTerm.toLowerCase());
        }).filter(quiz => {
            const date = new Date(quiz.created_at).toLocaleString();
            return date.toLowerCase().includes(dateTerm.toLowerCase());
        }).filter(quiz => {
            const creatorTerms = creatorTerm.toLowerCase().split(' ');
            let contains = false;
            creatorTerms.forEach(term => {
                if (quiz.first_name.toLowerCase().includes(term) || quiz.last_name.toLowerCase().includes(term) ) {
                    contains = true
                }
            });
            return contains;
        })

    const quizzesList = quizzesFiltered.map((quiz) => {
        return (
            <tr key={quiz.created_at} className="list-item-selectable" onClick={() => handleClick(quiz)}>
                <td><h4>{quiz.title}</h4></td>
                <td>{quiz.language}</td>
                <td>{quiz.cultural_topic}</td>
                <td>{quiz.course}</td>
                <td>{new Date(quiz.created_at).toLocaleString()}</td>
                <td>{quiz.first_name} {quiz.last_name}</td>
            </tr>
        );
    });

    return (
        <div className="container">
            <h1>Select a quiz...</h1>
            <table className="standard-table">
                <tbody>
                    <tr>
                        <td><h2>Quiz Title</h2></td>
                        <td><h2>Language</h2></td>
                        <td><h2>Cultural Topics</h2></td>
                        <td><h2>Course</h2></td>
                        <td><h2>Created At</h2></td>
                        <td><h2>Created By</h2></td>
                    </tr>
                    <tr>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setTitleTerm(e.target.value)} value={titleTerm} className="table-input" placeholder="Search by Title" />
                                <BsXCircle className="xIcon" onClick={() => setTitleTerm('')}/>
                            </div>
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
                    {quizzesList}
                </tbody>
            </table>
        </div>
    )
}
