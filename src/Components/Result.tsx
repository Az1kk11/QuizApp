import React from 'react'

import { resetQuestions, selectQuestion } from '../Redux/Slice/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetResult, resultSelect } from '../Redux/Slice/resultSlice';
import { selectUserSlice } from '../Redux/Slice/userSlice';

import '../Style/Result.css'

export const Result: React.FC = () => {
  const dispatch = useDispatch()
  const { questionArr } = useSelector(selectQuestion);
  const { user } = useSelector(selectUserSlice)
  const { result } = useSelector(resultSelect);
  const navigate = useNavigate()

  const ball = 100 / questionArr.length
  let arr = []
  for (let i = 0; i < result.length + 1; i++) {
    if (result[i] === true) { arr.push(i) }
  }

  let resultarr = Math.floor(ball * arr.length)

  const onRestart = () => {
    dispatch(resetResult())
    dispatch(resetQuestions())
    navigate('/')
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Interaktiv test sisteması</h1>
      <div className='result flex-center'>

        <div className='flex'>
          <span>Paydalanıwshı atı </span>
          <span className='bold'>{user.name}</span>
        </div>

        <div className='flex'>
          <span>Jámi sorawlar : </span>
          <span className='bold'>{questionArr.length || 0}</span>
        </div>

        <div className='flex'>
          <span>Test nátiyjesi</span>
          <span className='bold'>{resultarr} ball</span>
        </div>

      </div>
      <div className="start">
        <Link className='btn' to={'/'} onClick={onRestart}>Testdi qayta baslaw </Link>
      </div>

    </div>
  )
}