import React from 'react';
import MCRender from './questionRendering.js/MCRender';
import TFRender from './questionRendering.js/TFRender';
import FBRender from './questionRendering.js/FBRender';

export default function QuizQuestion({question, addResponse}) {
    
    let responseInput;
    if (question.question_type === "MC") responseInput = <MCRender question={question} addResponse={addResponse}/>;
    else if (question.question_type === "FB") responseInput = <FBRender question={question} addResponse={addResponse}/>;
    else if (question.question_type === "TF") responseInput = <TFRender question={question} addResponse={addResponse}/>;

    return (
        <div className="container">
            <h3>{question.part_pos + 1}. {question.body.questionText}</h3>
            {responseInput}
        </div>
    )
}
