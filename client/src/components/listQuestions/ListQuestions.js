import React from 'react';
import { useSelector } from 'react-redux';
import MCListQuestionEntry from './MCListQuestionEntry';
import TFListQuestionEntry from './TFListQuestionEntry';
import FBListQuestionEntry from './FBListQuestionEntry';

export default function ListQuestions({ part }) {
    const partId = part.id;
    const partQuestions = part.questions || [];
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);


    const questionsList = partQuestions.map((question, index) => {
        if (question.question_type === "MC") {
            return <MCListQuestionEntry question={question} index={index} partId={partId} />
        } else if (question.question_type === "TF") {
            return <TFListQuestionEntry question={question} index={index} partId={partId} />
        } else if (question.question_type === "FB") {
            return <FBListQuestionEntry question={question} index={index} partId={partId} />
        }   
    });

    const displayVis = partQuestions.length > 0 ? {display: "block"} : {display: "none"};

    return (
        <div>
            <table style={displayVis} className="standard-table">
                <tbody>
                    <tr className="list-item">
                        <th>
                            Type
                        </th>
                        <th>
                            Text
                        </th>
                        <th>
                            Responses
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                    {questionsList}
                </tbody>
            </table>   
        </div>
    )
}
