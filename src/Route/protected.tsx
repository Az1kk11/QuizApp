import { Outlet, Navigate } from "react-router-dom"

const useAuth = () => {
    const user = localStorage.getItem('token')
    if (user) {
        return true
    } else {
        return true
    }
}

const Protected = () => {
    const auth = useAuth()

    return auth ? <Outlet /> : <Navigate to="/admin-login" />
}

export default Protected