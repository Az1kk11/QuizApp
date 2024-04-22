import React, { useEffect } from 'react'
import { selectQuestion } from '../Redux/Slice/questionSlice';
import { useSelector } from 'react-redux';


export const Questions: React.FC<any> = ({ currentPosts }) => {

  console.log(currentPosts);


  return (
    <div className="questions">

      <p>{currentPosts[0]?.question}</p>
      <ul>
        {currentPosts[0]?.options.map((item:any, idx: number) => (
          <li key={idx}>
            <input id={item} type='checkbox' />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}