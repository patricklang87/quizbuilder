import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { questionTypes } from '../../utils/questions';
import { BsCheck, BsX } from 'react-icons/bs';
import { removeQuizQuestion, updateQuizQuestion } from '../../redux/editQuizRedux';
import { deleteQuestion, updateQuestion } from '../../utils/questions';

export default function MCListQuestionEntry({question, index, partId}) {
    const [showEdit, setShowEdit] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = async (e, questionId) => {
        e.stopPropagation();
        try {
            const response = await deleteQuestion(questionId);
            dispatch(removeQuizQuestion({partId, questionId}));
        } catch (error) {
            console.log(error);
        }
    }

    const NonEditEntry = () => {
        const responsesList = question.body.responses.map((res) => {
            return (<p key={`${question.id} ${index} ${res.text}`} style={{ fontSize: 'small'}}>{res.text + " "} {res.correct ? <BsCheck /> : <BsX /> }</p>);
        });

        return (
            <tr onClick={() => {setShowEdit(true)}} className="list-item-selectable" key={'partQuestions' + question.id}>
                <td>{`${index + 1}) `} {questionTypes[question.question_type].short}</td>
                <td>{question.body.questionText}</td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {responsesList}
                    </div>
                </td>
                <td><button onClick={(e) => handleDelete(e, question.id)} className="btn-caution btn-small">Delete</button></td>
            </tr>
        )
    }

    const EditEntry = () => {
        const [questionText, setQuestionText] = useState(question.body.questionText);
        const [questionResponses, setQuestionResponses] = useState(question.body.responses);

        const handleChangeCorrect = (i) => {
            setQuestionResponses(questionResponses.map((res, index) => {
                return index === i
                    ? {...res, correct : !res.correct}
                    : res
            }));
        }

        const handleChangeResponse = (e, i) => {
            setQuestionResponses(questionResponses.map((res, index) => {
                return index === i
                    ? {...res, text: e.target.value}
                    : res
            }))
        }

        const handleSave = async () => {
            try { 
              const data = { questionText, responses: questionResponses, questionId: question.id }
              const response = await updateQuestion(data);
              dispatch(updateQuizQuestion(response.data));
              setShowEdit(false);
            } catch (error) {
                console.log(error)
            }
        }

        const responsesList = questionResponses.map((res, i) => {
            return (
            <div>
                <input type="text" style={{ fontSize: 'small'}} defaultValue={res.text} onChange={(e) => handleChangeResponse(e, i)}/>
                <input type="checkbox" defaultChecked={res.correct} onChange={() => {handleChangeCorrect(i)}} />
            </div>

            );
        });

        return (
            <tr className="list-item" key={'partQuestions' + question.id}>
                <td>{`${index + 1}) `} {questionTypes[question.question_type].short}</td>
                <td><input type="text" defaultValue={question.body.questionText} onChange={e => {setQuestionText(e.target.value)}} /></td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {responsesList}
                    </div>
                </td>
                <td><button onClick={(e) => handleSave(e, question.id)} className="btn-primary btn-small">Save</button></td>
            </tr>
        )
    }

    return showEdit ? <EditEntry /> : <NonEditEntry />

}
