import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthUserServices from '../Redux/services'
import { toast } from 'react-toastify'
import { selectUserSlice, siginStart, siginSuccess } from '../Redux/Slice/userSlice'
import '../Style/Main.css'
import { categorie, select } from '../Redux/Slice/slice'
import { Questions } from './Questions'
import { Quiz } from './Quiz'
import { useNavigate } from 'react-router-dom'
import { startExamAction } from '../Redux/Slice/questionSlice'

type categorieType = {
  id: number,
  name: string,
  question: number
}

export const Main: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logedIn, user } = useSelector(selectUserSlice)
  const { categories } = useSelector(select)
  const [lore, setLore] = useState(false)
  const [categoryId, setCategoryId] = useState(1)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const rigisterHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()

    const user = new FormData()
    user.set('email', email)
    user.set('name', name)
    user.set('password', password)

    try {
      const res = await AuthUserServices.userRegister(user)
      toast.success(res.message)
      if (res.message === 'Successful created') {
        setLore(lore)
      } else {
        setLore(!lore)
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  const loginHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
    e.preventDefault()
    const userLogin = new FormData()
    userLogin.set('email', email)
    userLogin.set('password', password)
    dispatch(siginStart())
    try {
      const res = await AuthUserServices.userLogin(userLogin)
      dispatch(siginSuccess(res))
      toast.success(res.message)
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }

  const getCategory = async () => {
    try {
      const res = await AuthUserServices.allCategory()
      dispatch(categorie(res))
    } catch (error) {
      console.log(error);
    }
  }

  const questions = async (id: any) => {
    try {
      const res = await AuthUserServices.categoryQuestion(id)
      dispatch(startExamAction(res))
      navigate('/quiz')
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div className='container'>
      <h1 className='title text-light'>Interaktiv test sisteması</h1>

      <ol>
        <li>Sizge izbe-iz 10 soraw beriledi.</li>
        <li>Tuwrı juwap ushın 10 ball beriledi.</li>
        <li>Hár bir sorawda ush variant bar. Siz tek bir varianttı tańlawıńız múmkin.</li>
        <li>Test tawsılıwınan aldın juwaplardı kórip shıǵıw hám ózgertiwińiz múmkin.</li>
        <li>Nátiyje test aqırında daǵaza etiledi.</li>
        <li>Testdi baslaw ushın iltimas dizimnen otin yakı sistemaǵa kirin</li>
      </ol>
      {logedIn ?
        <div className="go-test">
          <p>{user.name}</p>
          <div className="select-box">
            <label>Categorie</label>
            <select onChange={(e: any) => setCategoryId(e.target.value)}>
              {categories.map((item: categorieType) => (
                <option value={item.id} key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="btn-box">
            <button>Bir kategoriyag'a tiyisli tosınarlı 10 test</button>
            <button onClick={() => questions(categoryId)}>Bir kategoriyag'a tiyisli hamme test</button>
          </div>
        </div>
        :
        <div className="login-register">
          <div className="register">
            {lore ?
              <form id='form' onSubmit={loginHandler}>
                <input
                  type="email"
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  autoComplete='off'
                  required
                />
                <input
                  type='password'
                  placeholder='password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  autoComplete='off'
                  required
                />
                <button type='submit'>Kiriw</button>
              </form>
              :
              <form id='form' onSubmit={rigisterHandler}>
                <input
                  type="text"
                  placeholder='Atınız'
                  onChange={e => setName(e.target.value)}
                  value={name}
                  autoComplete='off'
                  required
                />
                <input
                  type="email"
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  autoComplete='off'
                  required
                />
                <input
                  type='password'
                  placeholder='password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  autoComplete='off'
                  required
                />
                <button type='submit'>Dizimnen otiw</button>
              </form>
            }
            <p onClick={() => setLore(!lore)}>{lore ? 'Dizimnen otiw' : 'Sistemaǵa kiriw'}</p>
          </div>
        </div>
      }

    </div>
  )
}