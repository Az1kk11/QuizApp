import React from 'react'
import { useSelector } from 'react-redux';

import { selectQuestion } from '../Redux/Slice/questionSlice';


export const Questions: React.FC<any> = ({ currentPosts, setAnswer }) => {
  const { trace } = useSelector(selectQuestion);

  return (
    <div className="questions">
      <p>{trace} {currentPosts[0]?.question}</p>

      <ul>
        {currentPosts[0]?.options.map((item: any, idx: number) => (

          <li key={idx}>
            <input type='radio' id={item} name="options" onChange={() => setAnswer(idx+1)} />
            <label className='text-primary' htmlFor={item}>{item}</label>
            <div className={`check`}></div>
          </li>

        ))}
      </ul>
    </div>
  )
}