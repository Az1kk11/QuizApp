import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Main, Quiz, Result } from '../Page'
import { AdminLogin, CreateC, CreateQ, ResultA, Users } from '../Admin'

import Protected from './protected'

const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/result' element={<Result />} />

            <Route path='admin-login' element={<AdminLogin />} />
            <Route element={<Protected />}>
                <Route path='admin/users' element={<Users />} />
                <Route path='admin/result' element={<ResultA />} />
                <Route path='admin/question' element={<CreateQ />} />
                <Route path='admin/category' element={<CreateC />} />
            </Route>
        </Routes >
    )
}

export default Routers