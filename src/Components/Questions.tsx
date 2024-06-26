import React from 'react'
import { useSelector } from 'react-redux';

import { selectQuestion } from '../Redux/Slice/questionSlice';

export const Questions: React.FC<any> = ({ currentPosts, setAnswer, secund }) => {
  const { trace } = useSelector(selectQuestion);

  return (
    <div className="questions">
      <p>{trace} {currentPosts[0]?.question}</p>
      <div className={'progresbar'}>{secund}</div>
      <ul>
        {currentPosts[0]?.options.map((item: string, idx: number) => (
          <li key={idx}>
            <input
              type='radio'
              name="options"
              id={item}
              onChange={() => setAnswer(idx + 1)}
            />

            <label className='text-primary' htmlFor={item}>{item}</label>
            <div className={`check`}></div>
          </li>

        ))}
      </ul>
    </div>
  )
}