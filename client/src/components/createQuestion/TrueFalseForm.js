import React, { useState } from 'react';

export default function TrueFalseForm({handleSave, questionText}) {
    const [responses, setResponses] = useState([{text: "true", correct: false}, {text: "false", correct: true}]);

    const handleResponses = (e) => {
        if (e.target.value === "true") {
            setResponses([{text: "true", correct: true}, {text: "false", correct: false}])
        } else {
            setResponses([{text: "true", correct: false}, {text: "false", correct: true}])
        }
    }


    const saveBtnClass = (questionText.length > 0) ? 'btn-primary' : "btn-primary btn-inactive";

    return (
        <div>      
            <div >
                <label for="markTrue">True:</label>
                <input type="radio" id="markTrue" name="truthValue" onChange={(e) => handleResponses(e)} value={true} />
                <label for="markFalse">False:</label>
                <input type="radio" id="markFalse" name="truthValue" onChange={(e) => handleResponses(e)} value={false} defaultChecked />
            </div>

            <button className={saveBtnClass} onClick={() => handleSave(responses, true)}>Save Question</button> 
        </div>
    )
}
