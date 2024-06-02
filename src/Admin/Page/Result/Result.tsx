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

  console.log(results);


  return (
    <div className='result-page'>
      <div className="result-content">
        <h3>Test nátiyjeleri</h3>
        <div className="res-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Gruppa</th>
                <th>Atı</th>
                <th>Nátiyje</th>
                <th>Waqtı</th>
              </tr>
            </thead>
            <tbody>
              {results?.map(item => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <th>{item.category?.name}</th>
                  <th>{item.user.name}</th>
                  <th>{item.result}</th>
                  <th> {format(item.submitted, "yyyy-MM-dd")}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}