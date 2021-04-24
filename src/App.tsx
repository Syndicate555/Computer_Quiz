import {useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {fetchQuizQuestions, Difficulty, Question, QuestionState} from './API'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Button } from 'react-bootstrap';



// styles
import {Wrapper} from "./App.styles"
import QuestionCard from './Components/QuestionCard'
import { toASCII } from 'punycode'

export type AnswerObject = {
  question: string;
  answer: string;
  correct:boolean;
  correctAnswer:string

}

const TOTAL_QUESTIONS = 20

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(1)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )
  
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
      
    } catch (error) {
      console.error(error)
      
    }

  }

  const nextQuestion  = (e: React.MouseEvent<HTMLButtonElement>) =>{
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
    
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore (prev => prev + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }

  }
  
  
 

  return (
    <div className="App">
      <h1>Computer Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS? (

      
      <button className = "start" onClick = {startTrivia}>Start</button>) : null }
      {!gameOver ? <p>Score {score}</p> : null }
      {loading && <LinearProgress/>}
      {!loading && !gameOver &&(
       <QuestionCard questionNr ={number} totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer} /> 
      )}
      {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS-1 ? (
      <Button className = "primary" onClick ={nextQuestion}>Next Question</Button>

      ): null}
    </div>
  );
}

export default App;
