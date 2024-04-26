import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Quiz, Result } from '../Components'


const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/result' element={<Result />} />
        </Routes >
    )
}

export default Routers