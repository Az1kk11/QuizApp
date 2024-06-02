import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectAuthAdmin, siginAdminStart, siginAdminSuccess } from '../../Redux/Slice/adminSlice'
import AuthUserServices from '../../Redux/services'
import { removeItem } from '../../Helper/persistance-storage'

import './admin-login.css'

export const AdminLogin: React.FC = () => {
    const { isLoading, logedIn } = useSelector(selectAuthAdmin)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEventHandler<HTMLFormElement> | any) => {
        e.preventDefault()

        removeItem('token')

        const adminLogin = new FormData()
        adminLogin.set('email', email)
        adminLogin.set('password', password)

        dispatch(siginAdminStart())
        try {   
            const response = await AuthUserServices.adminLogin(adminLogin)
            dispatch(siginAdminSuccess(response))
            toast.success('Siz tabıslı kirdingiz')
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    if (logedIn) { navigate('/admin/users') }

    return (
        <section className='admin-login'>
            <form onSubmit={loginHandler}>
                <h3>Admin</h3>
                <div className="input-box">
                    <input
                        type='text'
                        placeholder='Elektron pochta'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Jasırın sóz'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'Júklenbekte...' : 'Kiriw'}
                </button>
            </form>
        </section>
    )
}