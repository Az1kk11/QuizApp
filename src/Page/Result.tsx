import React, { useState } from 'react'

import { resetQuestions, selectQuestion } from '../Redux/Slice/questionSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetResult, resultSaveBc, resultSelect } from '../Redux/Slice/resultSlice';
import { selectUserSlice } from '../Redux/Slice/userSlice';

import '../Style/Result.css'
import AuthUserServices from '../Redux/services';
import { toast } from 'react-toastify';
import { getItem, removeItem } from '../Helper/persistance-storage';

export const Result: React.FC = () => {
  const dispatch = useDispatch()
  const { questionArr } = useSelector(selectQuestion);
  const { user } = useSelector(selectUserSlice)
  const { result, saveResult } = useSelector(resultSelect);
  const navigate = useNavigate()

  let categorie_id: string | any = getItem('categoryId')

  const ball = 100 / questionArr.length
  let arr = []
  for (let i = 0; i < result.length + 1; i++) {
    if (result[i] === true) {
      arr.push(i)
    }
  }

  let resultarr: string | any = Math.floor(ball * arr.length)

  const onRestart = () => {
    dispatch(resetResult())
    dispatch(resetQuestions())
    navigate('/')
  }
  
  const resultSave = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()

    const resultAdd = new FormData()
    resultAdd.set('result', resultarr)
    resultAdd.set('user_id', user?.id)
    resultAdd.set('category_id', categorie_id)

    try {
      const res = await AuthUserServices.addResult(resultAdd)
      dispatch(resultSaveBc(res))
      toast.success('Nátiyjeni saqlandı')
      removeItem('categoryId')
      
    } catch (error: any) {
      console.log(error)
    }
  }

  if (questionArr.length === 0) { navigate('/') }

  return (
    <div className='container'>
      <div className="result-box">
        <h1 className='title text-light'>Interaktiv test sisteması</h1>
        <div className='result flex-center'>

          <div className='flex'>
            <span>Paydalanıwshı atı </span>
            <span className='bold'>{user?.name}</span>
          </div>

          <div className='flex'>
            <span>Jámi sorawlar : </span>
            <span className='bold'>{questionArr.length || 0}</span>
          </div>

          <div className='flex'>
            <span>Ulıwma ball</span>
            <span className='bold'>100</span>
          </div>

          <div className='flex'>
            <span>Tuwrı juwaplar</span>
            <span className='bold'>{arr.length}</span>
          </div>

          <div className='flex'>
            <span>Nadurıs juwaplar</span>
            <span className='bold'>{result.length - arr.length}</span>
          </div>

          <div className='flex'>
            <span>Test nátiyjesi</span>
            <span className='bold'>{resultarr} ball</span>
          </div>

        </div>
        <div className="start">
          <Link className='btn' to={'/'} onClick={onRestart}>Testdi qayta baslaw </Link>
          <button className='btn' disabled={saveResult} onClick={resultSave}>Nátiyjeni saqlaw</button>
        </div>
      </div>
    </div>
  )
}