import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { nextQuestions, selectQuestion, } from '../Redux/Slice/questionSlice'
import { pushResultAction, resultSelect } from '../Redux/Slice/resultSlice'
import { toast } from 'react-toastify'
import { Questions } from '../Components/Questions'

import '../Style/Quiz.css'

export const Quiz: React.FC = () => {
  const dispatch = useDispatch()
  const { questionArr, trace } = useSelector(selectQuestion);
  const { result } = useSelector(resultSelect);
  const [postsPerPage, setPostsPerPage] = useState<number>(1)
  const [answer, setAnswer] = useState<number>()
  const [secund, setSecund] = useState(30)

  const indexOfLastPost: number = trace * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: any = questionArr.slice(indexOfFirstPost, indexOfLastPost)

  let timer: any

  useEffect(() => {
    timer = setInterval(() => {
      setSecund(secund - 1)
      if (secund === 0) {
        dispatch(nextQuestions())
        setSecund(30)
        if (answer === undefined) {
          dispatch(pushResultAction(false))
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [secund])

  const next = () => {
    if (answer === undefined) {
      toast.error('Iltimas bir juwabdı belgileń')
    } else {
      dispatch(nextQuestions())
      setSecund(30)
      if (Number(currentPosts[0]?.correct_option) === answer) {
        dispatch(pushResultAction(true))
      } else {
        dispatch(pushResultAction(false))
      }
    }
  }

  if (questionArr.length === result.length) {
    return <Navigate to={'/result'} replace={true}></Navigate>
  }

  const quizProps = { currentPosts, setAnswer, secund }

  return (
    <div className='quiz-page'>
      <h1>Interaktiv test sisteması</h1>
      <Questions {...quizProps} />

      <div className='grid'>
        <button className='btn next' onClick={next}>
          Keyingi
        </button>
      </div>
    </div>
  )
}