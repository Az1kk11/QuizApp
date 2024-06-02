import { Outlet, Navigate } from "react-router-dom"

const useAuth = () => {
    const userToken = localStorage.getItem('tokenAdmin')
    if (userToken) {
        return true
    } else {
        return false
    }
}

const Protected = () => {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to="/admin-login" />
}

export default Protected