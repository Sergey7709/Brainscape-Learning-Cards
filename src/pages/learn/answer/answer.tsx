import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { RadioGroupAnswer } from '@/pages/learn/answer/radioGroupAnswer.tsx'
import { isGrade } from '@/pages/learn/constants-learn'
import s from '@/pages/learn/learn.module.scss'
import { useGradeCardMutation } from '@/service'

type AnswerProps = {
  nameCard: string
  imageAnswer: string
  answer: string
  shots: number
  handlerLearn: (value: boolean) => void
  cardID: string
  deckID: string
}

export const Answer = ({
  nameCard,
  imageAnswer,
  shots,
  answer,
  cardID,
  deckID,
  handlerLearn,
}: AnswerProps) => {
  const [gradeAnswer, setGradeAnswer] = useState('')
  const [postGradeAnswer] = useGradeCardMutation()

  const handlerValueAnswer = (value: string) => {
    setGradeAnswer(value)
  }

  const handlerPostAnswer = () => {
    // console.log('value', gradeAnswer, 'cardID', cardID, 'deckID', deckID)
    const grade = Number(gradeAnswer)

    if (isGrade(grade)) {
      postGradeAnswer({
        id: deckID,
        body: {
          cardId: cardID,
          grade: grade,
        },
      })
    } else {
      console.error('Invalid gradeAnswer:', gradeAnswer)
    }
    handlerLearn(false)
  }

  return (
    <>
      <Typography className={s.learnNamePack}>{`Learn "${nameCard}"`}</Typography>
      <div className={s.learnQuestionWrapper}>
        {imageAnswer && <img className={s.learnQuestionImg} src={imageAnswer} alt={'Not Image'} />}
        <Typography className={s.learnQuestionText}>{`Answer:  ${answer}`}</Typography>
        <Typography className={s.learnCount}>
          {`Количество попыток ответов на вопрос: ${shots}`}
        </Typography>
      </div>
      <div className={s.learnRadioGroupAnswer}>
        <Typography>{`Rate yourself:`}</Typography>
        <RadioGroupAnswer handlerValueAnswer={handlerValueAnswer} />
      </div>
      <Button onClick={handlerPostAnswer} fullWidth>
        <Typography className={s.learnButtonText}>Next Question</Typography>
      </Button>
    </>
  )
}
