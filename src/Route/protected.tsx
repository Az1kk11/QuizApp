import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserSlice } from "../Redux/Slice/userSlice"

const useAuth = () => {
    const { user } = useSelector(selectUserSlice)
    const userToken = localStorage.getItem('tokenAdmin')
    if (userToken ) {
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