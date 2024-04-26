import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { siginStart, siginSuccess } from '../Redux/Slice/userSlice'
import AuthUserServices from '../Redux/services'

import { toast } from 'react-toastify'

import '../Style/Main.css'

export const UserLoginRegister = () => {
    const dispatch = useDispatch()
    const [lore, setLore] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [nameUser, setNameUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const rigisterHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
        e.preventDefault()

        const user = new FormData()
        user.set('email', email)
        user.set('name', nameUser)
        user.set('password', password)

        try {
            const res = await AuthUserServices.userRegister(user)
            toast.success(res?.message)
            if (res?.message === 'Successful created') {
                setLore(lore)
            } else {
                setLore(!lore)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message)
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

    return (
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
                            onChange={e => setNameUser(e.target.value)}
                            value={nameUser}
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
    )
}