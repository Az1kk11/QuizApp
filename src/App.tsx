import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { selectUserSlice, siginSuccess } from './Redux/Slice/userSlice'
import AuthUserServices from './Redux/services'

import Routers from './Route/routers'
import { LeftNavbar } from './Admin'

import './Style/App.css'
import { getItem } from './Helper/persistance-storage'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { logedIn } = useSelector(selectUserSlice)

  const getUser = async () => {
    try {
      const res = await AuthUserServices.getme()
      dispatch(siginSuccess(res.user))
    } catch (error) {
      console.log(error);
    }
  }

  let key = getItem('token')

  useEffect(() => {
    getUser()
    if (location.pathname === '/admin') {
      navigate('/admin/users')
    }
  }, [logedIn])

  return (
    <div className={location.pathname.startsWith('/admin') ? 'layout' : ''}>
      {location.pathname.startsWith('/admin') ? <LeftNavbar /> : ''}
      <Routers />
    </div>
  )
}

export default App