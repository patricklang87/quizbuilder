import React from 'react'

export default function TFRender({question, addResponse}) {
    const handleChange = (e) => {
        const val = e.target.value;
        const res = {...question, response: val};
        addResponse(res);
    }

    return (
        <div>
            <input name={question.id} type="radio" id={`${question.id}t`} value={true} onClick={e => handleChange(e)} />
            <label for={`${question.id}t`}>True</label><br />
            <input name={question.id} type="radio" id={`${question.id}f`} value={false} onClick={e => handleChange(e)} />
            <label for={`${question.id}f`}>False</label>
        </div>
    )
}
