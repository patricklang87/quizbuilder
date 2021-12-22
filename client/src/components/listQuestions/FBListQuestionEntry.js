import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { questionTypes } from '../../utils/questions';
import { BsCheck, BsX } from 'react-icons/bs';
import { removeQuizQuestion, updateQuizQuestion } from '../../redux/editQuizRedux';
import { deleteQuestion, updateQuestion } from '../../utils/questions';
import DeleteButton from '../../utils/DeleteButton';
import { setRandomFallback } from 'bcryptjs';

export default function FBListQuestionEntry({question, index, partId}) {
    const [showEdit, setShowEdit] = useState(false);

    const dispatch = useDispatch();

    const responsesListText = question.body.responses.map(res => {
        return res.text
    });
    const responsesListJoined = responsesListText.join(" | ");

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


        return (
            <tr onClick={() => {setShowEdit(true)}} className="list-item-selectable" key={'partQuestions' + question.id}>
                <td>{`${index + 1}) `} {questionTypes[question.question_type].short}</td>
                <td>{question.body.questionText}</td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {responsesListJoined}
                    </div>
                </td>
                <td><button onClick={(e) => handleDelete(e, question.id)} className="btn-small btn-caution">Delete</button></td>
            </tr>
        )
    }

    const EditEntry = () => {
        const [questionText, setQuestionText] = useState(question.body.questionText);
        const [questionResponses, setQuestionResponses] = useState(responsesListJoined);


        const handleSave = async () => {
            const newResList = questionResponses.split("|").map(res => {
                const item = {
                    text: res.trim(),
                    correct: true
                }
                return item;
            });

            try { 
              const data = { questionText, responses: newResList, questionId: question.id }
              const response = await updateQuestion(data);
              dispatch(updateQuizQuestion(response.data));
              setShowEdit(false);
            } catch (error) {
                console.log(error)
            }
        }


        return (
            <tr className="list-item" key={'partQuestions' + question.id}>
                <td>{`${index + 1}) `} {questionTypes[question.question_type].short}</td>
                <td><input type="text" defaultValue={question.body.questionText} onChange={e => {setQuestionText(e.target.value)}} /></td>
                <td>
                    <input type="text" style={{ fontSize: 'small'}} defaultValue={responsesListJoined} onChange={(e) => setQuestionResponses(e.target.value)}/>
                </td>
                <td><button onClick={(e) => handleSave(e, question.id)} className="btn-primary btn-small">Save</button></td>
            </tr>
        )
    }

    return showEdit ? <EditEntry /> : <NonEditEntry />

}