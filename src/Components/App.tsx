import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { siginSuccess } from '../Redux/Slice/userSlice'
import AuthUserServices from '../Redux/services'

import '../Style/App.css'
import { Main } from './Main'
import Routers from '../Route/routers'

const App: React.FC = () => {
  const dispatch = useDispatch()

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
  }, [])

  return <Routers />
}

export default App