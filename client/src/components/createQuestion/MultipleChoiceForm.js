import React, { useState } from 'react';


export default function MultipleChoiceForm({ questionText, handleSave }) {
    const [responses, setResponses] = useState([]);
    const [responseText, setResponseText] = useState('');
    const [info, setInfo] = useState('');

    const handleAddOption = () => {
        if (responseText.length === 0) {
            setInfo("Responses must contain text.");
            return;
        } 
        setResponses([...responses, {text: responseText, correct: false}]);
        setResponseText('');
    }

    const handleRemove = (index) => {
        let newAr = responses.filter((item, i) => {
            return (index !== i);
        });
        setResponses(newAr);
    }

    const handleRadio = (e, index) => {
        let newResponses = responses;
        let val = (e.target.value === "true") ? true : false;
        newResponses[index] = {...newResponses[index], correct: val};
        setResponses(newResponses);
    }

    const correctAnswerExists = (responses) => {
        const correctArray = responses.map(res => {return res.correct});
        return correctArray.includes(true);
    }

    const responseList = responses.map((item, index) => {
        return (
            <div className="list-item" key={'option' + (index).toString()}>
                <p><strong>{index + 1}.</strong> {item.text}</p>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <input type="radio" name={index} onChange={(e) => handleRadio(e, index)} value={true} />
                    <input type="radio" name={index} onChange={(e) => handleRadio(e, index)} value={false} defaultChecked />
                    <button className="btn-caution" onClick={() => handleRemove(index)}>Remove</button>
                </div>
            </div>
        );
    });


    const saveBtnClass = (responses.length > 1 && questionText.length > 0) ? 'btn-primary' : "btn-primary btn-inactive";
    const addOptionBtnClass = (responseText.length > 0) ? 'btn-secondary' : 'btn-secondary btn-inactive';

    return (
        <div>      

            {responseList}
            <label htmlFor="responseText">Response Option:</label><br />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <textarea id="responseText" value={responseText} onChange={e => setResponseText(e.target.value)} />
            <button className={addOptionBtnClass} onClick={() =>  handleAddOption()}>Add Option</button> <br />
            </div>

            <button className={saveBtnClass} onClick={() => handleSave(responses, correctAnswerExists(responses))}>Save Question</button> 
        </div>
    )
}
