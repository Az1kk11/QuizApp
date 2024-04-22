import React, { useState } from 'react'
import '../Style/Quiz.css'
import { Questions } from './Questions'
import { useDispatch, useSelector } from 'react-redux'
import { nextQuestions, prevQuestions, selectQuestion, } from '../Redux/Slice/questionSlice'

export const Quiz = () => {
  const dispatch = useDispatch()
  const { questionArr, trace } = useSelector(selectQuestion);
  console.log(trace);

  const [postsPerPage, setPostsPerPage] = useState(1)

  const indexOfLastPost = trace * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = questionArr.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className='quiz-page'>
      <h1>Interaktiv test sisteması</h1>
      <Questions currentPosts={currentPosts} />

      <div className='grid'>
        <button
          className='btn prev'
          onClick={() => dispatch(prevQuestions())}
          disabled={trace === 1 ? true : false}
        >
          Prev
        </button>
        <button
          className='btn next'
          onClick={() => dispatch(nextQuestions())}
          disabled={questionArr.length === trace ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  )
}