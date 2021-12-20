import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { questionTypes } from '../../utils/questions';
import { BsCheck, BsX } from 'react-icons/bs';
import { removeQuizQuestion, updateQuizQuestion } from '../../redux/editQuizRedux';
import { deleteQuestion, updateQuestion } from '../../utils/questions';

export default function TFListQuestionEntry({question, index, partId}) {
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
        console.log("ture?", question.body.responses)
        return (
            <tr onClick={() => {setShowEdit(true)}} className="list-item-selectable" key={'partQuestions' + question.id}>
                <td>{`${index + 1}) `} {questionTypes[question.question_type].short}</td>
                <td>{question.body.questionText}</td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {question.body.responses[0]['correct'] ? <BsCheck /> : <BsX />}
                    </div>
                </td>
                <td><button onClick={(e) => handleDelete(e, question.id)} className="btn-caution btn-small">Delete</button></td>
            </tr>
        )
    }

    const EditEntry = () => {
        const [questionText, setQuestionText] = useState(question.body.questionText);
        const [questionResponses, setQuestionResponses] = useState(question.body.responses);

        const handleChangeCorrect = () => {
            const newRes = !question.body.responses[0]['correct'];
            if (newRes === true) {
                setQuestionResponses([{text: "true", correct: true}, {text: "false", correct: false}]);
            } else {
                setQuestionResponses([{text: "true", correct: false}, {text: "false", correct: true}]);
            }
        }

        const handleSave = async () => {
            try { 
              const data = { questionText, responses: questionResponses, questionId: question.id }
              const response = await updateQuestion(data);
              console.log(response.data);
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <input type="checkbox" defaultChecked={question.body.responses[0]['correct']} onChange={() => {handleChangeCorrect()}} />
                    </div>
                </td>
                <td><button onClick={(e) => handleSave(e, question.id)} className="btn-primary btn-small">Save</button></td>
            </tr>
        )
    }

    return showEdit ? <EditEntry /> : <NonEditEntry />


    
}