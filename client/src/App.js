//dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Landing from './components/Landing';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import CreateQuestion from './components/createQuestion/CreateQuestion';
import ListQuestions from './components/listQuestions/ListQuestions';
import CreateQuiz from './components/quiz/CreateQuiz';
import EditQuiz from './components/quiz/EditQuiz';
import QuizList from './components/quiz/QuizList';
import SelectQuiz from './components/takeQuiz/SelectQuiz';
import QuizForm from './components/takeQuiz/QuizAssembly/QuizForm';
import ResultsForm from './components/viewResults/ResultsForm';
import AssessmentDash from './components/dashboard/AssessmentDash';
import AssessmentsList from './components/viewResults/AssessmentsList';
import Footer from './components/Footer';

//redux
import { setCurrentUser, removeCurrentUser } from './redux/userRedux';

//utilities
import { getUserData } from './utils/auth';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.id);
  
  useEffect(() => {
    const checkForLogin = async () => {
      if (localStorage.getItem('quizbuilder_token')) {
        try {
          let response = await getUserData();
          dispatch(setCurrentUser({user: response.data.user.rows[0]}));
        } catch (err) {
          console.log(err);
        }
    } else {
      if (currentUser) {
        dispatch(removeCurrentUser());
      }
    }
  }
  
  checkForLogin();
  }, []);

  return (
    <div className="App">
      <Router>
          <Header />
          <main>
          <Routes>
            <Route path='/' element={<Landing />} /> 
            <Route path='/dashboard' element={<Dashboard />}>
              {/* <Route path='createQuestion' element={<CreateQuestion />} />
              <Route path='myQuestions' element={<ListQuestions />} /> */}
              <Route path='createQuiz' element={<CreateQuiz />} />
              <Route path='editQuiz' element={<EditQuiz />} />
              <Route path='myQuizzes' element={<QuizList />} />
            </Route>
            <Route path='/assessmentDash' element={<AssessmentDash />}>
              <Route path='takeAssessment' element={<SelectQuiz />} />
              <Route path="quizForm" element={<QuizForm />}/>
              <Route path="resultsForm" element={<ResultsForm />}/>
              <Route path="assessmentsList" element={<AssessmentsList />}/>
            </Route>
            
          </Routes>
          </main>
      </ Router>
      <Footer />
    </div>
  );
}

export default App;
