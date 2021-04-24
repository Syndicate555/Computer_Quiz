import React from 'react'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';
import {AnswerObject } from '../App'
type Props ={
    question:string;
    answers: string[];
    callback:any;
    userAnswer:AnswerObject | undefined;
    questionNr:number;
    totalQuestions:number;
}

const QuestionCard:React.FC <Props> = ({question, answers,callback, userAnswer, questionNr, totalQuestions}) => {
    return (
        <Wrapper>
            <p>
                Questions Completed: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML ={{__html:question}}/>

            <div>{answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
            
        </Wrapper>
    )
}

export default QuestionCard
