import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzesDesigned, deleteQuiz } from '../../utils/quizzes';
import { setQuizzesDesigned, removeQuizDesigned } from '../../redux/userRedux';
import { setQuiz} from '../../redux/editQuizRedux';
import { useNavigate } from 'react-router';
import { BsXCircle } from 'react-icons/bs';


export default function QuizList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzesDesigned = useSelector(state => state.user.quizzesDesigned);
    const [titleTerm, setTitleTerm] = useState('');
    const [languageTerm, setLanguageTerm] = useState('');
    const [topicTerm, setTopicTerm] = useState('');
    const [courseTerm, setCourseTerm] = useState('');
    const [dateTerm, setDateTerm] = useState('');

    useEffect(() => {
        const getQuizzes = async () => {
            const response = await getQuizzesDesigned();
            dispatch(setQuizzesDesigned(response.data));
        }

        if (quizzesDesigned.length === 0) {
            getQuizzes();
        }
    });

    const handleClick = (quiz) => {
        dispatch(setQuiz(quiz));
        navigate('/dashboard/editQuiz');
    }

    const handleDelete = async (e, quizId) => {
        e.stopPropagation();
        try {
            const response = await deleteQuiz(quizId);
            dispatch(removeQuizDesigned(quizId));
        } catch (error) {
            console.log(error)
        }
    }

    const quizzesDesignedSorted = [...quizzesDesigned].sort((a, b) => {
        let da = new Date(a.created_at);
        let db = new Date(b.created_at);
        return db - da;
    });

    const quizzesDesignedFiltered = quizzesDesignedSorted
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
        })

    const quizzesDesignedList = quizzesDesignedFiltered.map((quiz) => {
        return (
            <tr key={quiz.created_at} className="list-item-selectable" onClick={() => handleClick(quiz)}>
                <td><h4>{quiz.title}</h4></td>
                <td>{quiz.total_submissions || 0}</td>
                <td>{quiz.average_score || "N/A"}</td>
                <td>{quiz.language}</td>
                <td>{quiz.cultural_topic}</td>
                <td>{quiz.course}</td>
                <td>{new Date(quiz.created_at).toLocaleString()}</td>
                <td><button onClick={(e) => {handleDelete(e, quiz.id);}} className="btn btn-caution">Delete</button></td>
            </tr>
        );
    });

    return (
        <div className="container">
            <h1>My Quizzes</h1>
            <table className="standard-table">
                <tbody>
                    <tr>
                        <td><h2>Quiz Title</h2></td>
                        <td><h2># Subs</h2></td>
                        <td><h2>Avg. Score</h2></td>
                        <td><h2>Language</h2></td>
                        <td><h2>Cultural Topics</h2></td>
                        <td><h2>Course</h2></td>
                        <td><h2>Created At</h2></td>
                        <td><h2>Delete</h2></td>
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
                            {/* <div className="td-input">
                                <input onChange={(e) => setTitleTerm(e.target.value)} value={titleTerm} className="table-input" placeholder="Search by Title" />
                                <BsXCircle className="xIcon" onClick={() => setTitleTerm('')}/>
                            </div> */}
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setLanguageTerm(e.target.value)} className="table-input" placeholder="...Language"/>
                                <BsXCircle className="xIcon" onClick={() => setLanguageTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setTopicTerm(e.target.value)} className="table-input" placeholder="...Topic"/>
                                <BsXCircle className="xIcon" onClick={() => setTopicTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setCourseTerm(e.target.value)} className="table-input" placeholder="...Course"/>
                                <BsXCircle className="xIcon" onClick={() => setCourseTerm('')}/>
                            </div>
                        </td>
                        <td>
                            <div className="td-input">
                                <input onChange={(e) => setDateTerm(e.target.value)} className="table-input" placeholder="...Creation Date"/>
                                <BsXCircle className="xIcon" onClick={() => setDateTerm('')}/>
                            </div>
                        </td>
                    </tr>
                    {quizzesDesignedList}
                </tbody>
            </table>
        </div>
    )
}
