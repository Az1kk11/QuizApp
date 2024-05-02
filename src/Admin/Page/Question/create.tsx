import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { categorie, select } from '../../../Redux/Slice/slice'
import AuthUserServices from '../../../Redux/services'
import { categorieState } from '../../type'

import './style.css'
import { toast } from 'react-toastify'

export const CreateQ: React.FC = () => {
    const dispatch = useDispatch()
    const { categories }: any = useSelector(select)

    const [question, setQuestion] = useState<string>('')
    const [categoryId, setCategoryId] = useState<number>(categories[0]?.id)
    const [option, setOption] = useState<string>('')
    const [corOption, setCorOption] = useState<number>(1)

    const getCategory = async () => {
        try {
            const res = await AuthUserServices.allCategory()
            dispatch(categorie(res))
        } catch (error) {
            console.log(error);
        }
    }

    const createQuestionHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
        e.preventDefault()
        const req = {
            'question': question,
            'category_id': Number(categoryId),
            'options': option.split(','),
            'correct_option': Number(corOption)
        }
        try {
            await AuthUserServices.createQuestion(req)
            toast.success('successfully created')
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => { getCategory() }, [])

    return (
        <div className='question-page'>
            <div className="question-content">
                <h3>Test qosiw</h3>
                <form onSubmit={createQuestionHandler}>
                    <input
                        type="text"
                        placeholder='Soraw'
                        required
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                    />
                    <select onChange={(e: any) => setCategoryId(e.target.value)}>
                        {categories.map((item: categorieState) => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <br />
                    <input
                        type="text"
                        placeholder='Variant'
                        value={option}
                        onChange={e => setOption(e.target.value)}
                    />
                    <select onChange={(e: any) => setCorOption(e.target.value)}>
                        <option value={1}>1-variant</option>
                        <option value={2}>2-variant</option>
                        <option value={3}>3-variant</option>
                        <option value={4}>4-variant</option>
                    </select>
                    <button type='submit'>Qosiw</button>
                </form>
            </div>
        </div>
    )
}