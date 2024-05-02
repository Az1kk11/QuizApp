import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import AuthUserServices from '../../../Redux/services'
import { categorieState } from '../../type'

import './style.css'

export const CreateC: React.FC = () => {
  const [catName, setCatName] = useState('')
  const [categorieSt, setCategorie] = useState<categorieState[]>([])

  const getCategory = async () => {
    try {
      const res = await AuthUserServices.allCategory()
      setCategorie(res)
    } catch (error) {
      console.log(error);
    }
  }

  const delCategory = async (id: number) => {
    try {
      await AuthUserServices.delCategory(id)
      getCategory()
    } catch (error) {
      console.log(error);
    }
  }

  const createCategoryHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()

    const newCategory = new FormData()
    newCategory.set('name', catName)
    try {
      await AuthUserServices.createCategory(newCategory)
      toast.success('successfully created')
      getCategory()
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => { getCategory() }, [])

  return (
    <div className="category-page">
      <div className="category-content">
        <h3>categorya jaratiw</h3>
        <form onSubmit={createCategoryHandler}>
          <input type="text" required placeholder='Category name' value={catName} onChange={e => setCatName(e.target.value)} />
          <button type='submit'>Jaratiw</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Ati</th>
              <th>Sorawlar</th>
              <th>Oshiriw</th>
            </tr>
          </thead>
          <tbody>
            {categorieSt?.map(item => (
              <tr>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.questions}</th>
                <th onClick={() => delCategory(item.id)}><i className="ri-delete-bin-line"></i></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}