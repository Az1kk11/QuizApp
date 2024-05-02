import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { siginSuccess } from './Redux/Slice/userSlice'
import AuthUserServices from './Redux/services'

import Routers from './Route/routers'
import { LeftNavbar } from './Admin'

import './Style/App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const res = await AuthUserServices.getme()
      dispatch(siginSuccess(res.user))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()
    if (location.pathname === '/admin') {
      navigate('/admin/users')
    }
  }, [])

  return (
    <div className={location.pathname.startsWith('/admin') ? 'layout' : ''}>
      {location.pathname.startsWith('/admin') ? <LeftNavbar /> : ''}
      <Routers />
    </div>
  )
}

export default App