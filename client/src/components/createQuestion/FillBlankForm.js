import React, { useState } from 'react';


export default function FillBlankForm({ questionText, handleSave }) {
    const [responses, setResponses] = useState('');
    const [info, setInfo] = useState('');

    const handleProcessSave = () => {
        let responseList = responses.split('|');
        responseList = responseList.map(res => {
            const listItem = {
                text: res.trim(),
                correct: true
            }
            return listItem;
            }
        );
        console.log("rLis", responseList);
        handleSave(responseList, true);
    }

    const saveBtnClass = (responses.length > 0 && questionText.length > 0) ? 'btn-primary' : "btn-primary btn-inactive";

    return (
        <div>      
            <label htmlFor="responseText">Responses:</label><br />
            <textarea id="responseText" value={responses} onChange={e => setResponses(e.target.value)} />
            <p style={{fontSize: "small"}}>Multiple acceptable answers should be separated by a pipe: |.</p>
            <button className={saveBtnClass} onClick={handleProcessSave}>Save Question</button> 
        </div>
    )
}