import React from 'react'

export default function MCRender({question, addResponse}) {
    const responses = question.body.responses;

    const handleChange = (e) => {
        const val = e.target.value;
        const res = {...question, response: val};
        addResponse(res);
    }

    const responseList = responses.map((res, index) => {
        return (
            <>
                <input name={question.id} type="radio" id={res.text} value={res.text} onChange={e => handleChange(e)}/>
                <label for={res.text}>{res.text}</label> <br />  
            </>  
        );
    });


    return (
        <div>
            {responseList}
        </div>
    )
}
