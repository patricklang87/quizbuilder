import React from 'react'

export default function FBRender({question, addResponse}) {
    
    const handleChange = (e) => {
        const val = e.target.value;
        const res = {...question, response: val};
        addResponse(res);
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleChange(e)} />
        </div>
    )
}
