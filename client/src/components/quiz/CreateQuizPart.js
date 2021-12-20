import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPart, removePart } from '../../redux/editQuizRedux';
import CreateQuestion from '../createQuestion/CreateQuestion';
import { addQuizPart, deleteQuizPart, editQuizPart } from '../../utils/parts';
import ListQuestions from '../listQuestions/ListQuestions';



const SavedQuizPart = ({part, setEditingQuizPart}) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEditingQuizPart(true);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteQuizPart(part.id);
            dispatch(removePart(part.id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <label htmlFor="sectionTitle">Section Title:</label>
            <h3>{part.title || ''}</h3>
            <label htmlFor="sectionInstructions">Section instructions:</label>
            <p>{part.instructions || ''}</p>
            <label htmlFor="sectionQuestions">Questions:</label>
            <p>{part.questions ? part.questions.length : 0}</p>
            <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>
            <button className="btn btn-caution" onClick={handleDelete}>Delete</button>
        </> 
    )
}

const EditableQuizPart = ({part, index, setEditingQuizPart}) => { 
    const dispatch = useDispatch();  
    const quizId = useSelector(state => state.editQuiz.quizId);
    const parts = useSelector(state => state.editQuiz.parts);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [sectionTitle, setSectionTitle] = useState(part.title || '');
    const [sectionInstructions, setSectionInstructions] = useState(part.instructions || '');

    const handleSave = async () => {
        console.log(parts);
        if (!sectionTitle) {
            return;
        }

        const data = {
            title: sectionTitle,
            instructions: sectionInstructions,
            quiz_id: quizId,
            part_id: part.id,
            quiz_pos: parts.length
        }
        
        try {
            let response;
            console.log(part.id);
            if (!part.id) {
                response = await addQuizPart(data);    
            } else {
                response = await editQuizPart(data);
            }
            console.log(response);
            dispatch(editPart({data: response.data, index}));
            setEditingQuizPart(false);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <label htmlFor="sectionTitle">Section Title:</label><br />
            <input type="text" id="sectionTitle" defaultValue={part.title || ''} onChange={(e) => setSectionTitle(e.target.value)} /><br />
            <label htmlFor="sectionInstructions">Section instructions:</label><bt />
            <textarea id="sectionInstructions" defaultValue={part.instructions || ''} onChange={(e) => setSectionInstructions(e.target.value)} /><br />
            <button className="btn btn-secondary" onClick={handleSave} >Save</button>
            <ListQuestions part={part} />
            <div>
                {showAddQuestion && <CreateQuestion part={part} index={index} setShowAddQuestion={setShowAddQuestion} />}
                {!showAddQuestion && <button className="btn btn-secondary" onClick={() => {setShowAddQuestion(true)}} >Add Question</button>}
            </div>  
        </div>
    )

}

export default function CreateQuizPart({part, index}) {
    const [editingQuizPart, setEditingQuizPart] = useState(false);
    // const [showAddQuestion, setShowAddQuestion] = useState(false);

    return (
        <div className="editQuizPart">
            {editingQuizPart
                ? <EditableQuizPart part={part} index={index} setEditingQuizPart={setEditingQuizPart} />
                : <SavedQuizPart part={part} index={index} setEditingQuizPart={setEditingQuizPart} />}
        </div>
    )
}
