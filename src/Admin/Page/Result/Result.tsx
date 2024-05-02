import React, { useEffect, useState } from 'react'

import './style.css'
import AuthUserServices from '../../../Redux/services';
import { format } from 'date-fns';
import { resultState } from '../../type';

export const ResultA: React.FC = () => {
  const [results, setResults] = useState<resultState[]>([])

  const getResults = async () => {
    try {
      const res = await AuthUserServices.result()
      setResults(res.data.results)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { getResults() }, [])




  return (
    <div className='result-page'>
      <div className="result-content">
        <h3>Nátiyjeleri</h3>
      </div>
    </div>
  )
}