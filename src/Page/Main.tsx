import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectUserSlice } from '../Redux/Slice/userSlice'
import { removeItem } from '../Helper/persistance-storage'
import { GoTest, UserLoginRegister } from '../Components'

import '../Style/Main.css'

export const Main: React.FC = () => {
  const { logedIn } = useSelector(selectUserSlice)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    removeItem('token')
    removeItem('tokenAdmin')
    dispatch(logoutUser())
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Interaktiv test sisteması</h1>

      <ol>
        <li>Sizge izbe-iz 10 soraw beriledi.</li>
        <li>Tuwrı juwap ushın 10 ball beriledi.</li>
        <li>Hár bir sorawda tórt variant bar. Siz tek bir varianttı tańlawıńız múmkin.</li>
        <li>Nátiyje test aqırında daǵaza etiledi.</li>
        {logedIn ? '' : <li>Testdi baslaw ushın iltimas dizimnen otin yakı sistemaǵa kirin</li>}
      </ol>

      {logedIn ? <GoTest /> : <UserLoginRegister />}

      {logedIn ?
        <div className="logout" onClick={logoutHandler}>
          <i className="ri-logout-box-r-line"></i>
        </div>
        :
        ''
      }
    </div>
  )
}