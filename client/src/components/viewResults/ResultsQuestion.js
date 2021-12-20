import React from 'react';
import { useSelector } from 'react-redux'
import MCResult from './resultRendering/MCResult';
import TFResult from './resultRendering/TFResult';
import FBResult from './resultRendering/FBResult';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function ResultsQuestion({question}) {
    const { mark } = useSelector(state => state.takeQuiz.result)['responses'][question.id];
    
    let responseInput;
    if (question.question_type === "MC") responseInput = <MCResult question={question} />;
    else if (question.question_type === "FB") responseInput = <FBResult question={question} />;
    else if (question.question_type === "TF") responseInput = <TFResult question={question} />;

    const resultClass = mark ? "container result-correct" : 'container result-incorrect';

    return (
        <div className={resultClass} >
            <div>
                
                <h3>{mark ? <BsCheckCircleFill /> : <BsXCircleFill /> } {question.part_pos + 1}. {question.body.questionText}</h3>
            </div>
            {responseInput}
        </div>
    )
}