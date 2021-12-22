import React, { useState } from 'react';
import TrueFalseForm from './TrueFalseForm';
import FillBlankForm from './FillBlankForm';
import MultipleChoiceForm from './MultipleChoiceForm';
import { useDispatch, useSelector } from 'react-redux';
import { postQuestion, questionTypes } from '../../utils/questions';
import { addQuizQuestion } from '../../redux/editQuizRedux';

export default function CreateQuestion({part, setShowAddQuestion, index}) {
    const dispatch = useDispatch();
    const part_id = part.id;
    const questionsLength = part.questions.length;
    const quizId = useSelector(state => state.editQuiz.quizId);
    const curCulturalTopic = useSelector(state => state.editQuiz.culturalTopic);
    const curGrammarTopic = useSelector(state => state.editQuiz.grammarTopic);
    const curLanguage = useSelector(state => state.editQuiz.language);
    const [questionType, setQuestionType] = useState("MC");
    const [questionText, setQuestionText] = useState('');
    const [language, setLanguage] = useState(curLanguage);
    const [grammarTopic, setGrammarTopic] = useState(curGrammarTopic);
    const [culturalTopic, setCulturalTopic] = useState(curCulturalTopic);
    const [info, setInfo] = useState('');

    let questionOptions = Object.keys(questionTypes).map(key => {
        return <option value={questionTypes[key].short} key={questionTypes[key].short}>{questionTypes[key].long}</option>
    });

    const handleSave = async (responses, correctAnswerExists) => {
        if (questionText.length === 0) {
            setInfo("Please include a question.");
            return;
        }
        
        if (!correctAnswerExists) {
            setInfo("Please include at least one correct answer.");
            return;
        }
        const questionData = {
            questionText,
            language,
            grammarTopic,
            culturalTopic,
            responses,
            questionType,
            part_id,
            quizId,
            part_pos: questionsLength
        }
        try {
            const response = await postQuestion(questionData);
            dispatch(addQuizQuestion(response.data));
            setShowAddQuestion(false);
        } catch (error) {
            console.log(error);
            setInfo("Something went wrong. Please try again soon.")
        }   
    }

    const QuestionForm = () => {
        if (questionType === "MC") {
            return <MultipleChoiceForm setQuestionText={setQuestionText} questionText={questionText} handleSave={handleSave} />
        } else if (questionType === "TF") {
            return <TrueFalseForm setQuestionText={setQuestionText} questionText={questionText} handleSave={handleSave}/>
        } else if (questionType === "FB") {
            return <FillBlankForm setQuestionText={setQuestionText} questionText={questionText} handleSave={handleSave}/> 
        }
    }

    return (
        <div className="container">
            <h3>Create a Question</h3>
            <div>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "start"}}>
                    <div className="questionEncoding">
                        <label htmlFor="questionType" id="questionType">Question Type:</label><br />
                        <select onChange={(e) => {setQuestionType(e.target.value)}}>
                            {questionOptions}
                        </select>
                    </div>
                    <div className="questionEncoding">
                        <label htmlFor="language"  id="language">Language:</label><br />
                        <input type="text" defaultValue={language} onChange={(e) => {setLanguage(e.target.value)}} />
                    </div>
                    <div className="questionEncoding">
                        <label htmlFor="grammarTopic"  id="grammarTopic">Grammatical Topic:</label><br />
                        <input type="text" defaultValue={curGrammarTopic} onChange={(e) => {setGrammarTopic(e.target.value)}} />
                    </div>
                    <div className="questionEncoding">
                        <label htmlFor="culturalTopic" id="culturalTopic">Cultural Topic:</label><br />
                        <input type="text" defaultValue={culturalTopic} onChange={(e) => {setCulturalTopic(e.target.value)}} />
                    </div>
                </div>
                <div>
                    <p className='alert-text'>{info}</p>      
                    <label htmlFor="questionText">Question Text:</label><br />
                    <textarea id="questionText" value={questionText} onChange={(e) => {setQuestionText(e.target.value)}} /><br />
                    <QuestionForm />
                </div>
            </div>
        </div>
    )
}
