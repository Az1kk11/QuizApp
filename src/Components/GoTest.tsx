import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { startExamAction } from '../Redux/Slice/questionSlice'
import { selectUserSlice } from '../Redux/Slice/userSlice'
import { categorie, select } from '../Redux/Slice/slice'
import AuthUserServices from '../Redux/services'
import { setItem } from '../Helper/persistance-storage'

type categorieType = {
    id: number,
    name: string,
    question: number
}

export const GoTest: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(selectUserSlice)
    const { categories } = useSelector(select)
    const [categoryId, setCategoryId] = useState()

    const getCategory = async () => {
        try {
            const res = await AuthUserServices.allCategory()
            dispatch(categorie(res))
            setCategoryId(res[0].id)
        } catch (error) {
            console.log(error);
        }
    }

    const questionsRandom = async (id: any) => {
        setItem('categoryId', id)
        try {
            const res = await AuthUserServices.categoryQuestionRandom(id)
            dispatch(startExamAction(res))
            navigate('/quiz')
        } catch (error) { console.log(error) }
    }

    useEffect(() => { getCategory() }, [])

    return (
        <div className="go-test">
            <h4>Paydalanıwshı atı: <p>{user?.name}</p></h4>

            <div className="select-box">
                <label>Gruppalar</label>

                <select onChange={(e: any) => setCategoryId(e.target.value)}>
                    {categories.map((item: categorieType) => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className="btn-box">
                <button
                    onClick={() => questionsRandom(categoryId)}
                >
                    Testdi baslaw
                </button>
            </div>

        </div>
    )
}