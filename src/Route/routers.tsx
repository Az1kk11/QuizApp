import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main, Quiz } from '../Components'


const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/quiz' element={<Quiz />} />
        </Routes >
    )
}

export default Routers