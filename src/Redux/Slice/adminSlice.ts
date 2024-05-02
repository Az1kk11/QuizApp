import { createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { setItem } from "../../Helper/persistance-storage"

const initialState = {
    isLoading: false,
    logedIn: false,
    error: null,
    user: null
}

export const authSliceAdmin = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        siginAdminStart: state => {
            state.isLoading = true
        },
        siginAdminSuccess: (state, action) => {
            state.logedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem('token', action.payload.token)
            setItem('tokenAdmin', action.payload.token)
        },
        logoutAdmin: state => {
            state.user = null
            state.logedIn = false
        }
    }
})

export const {
    siginAdminStart,
    siginAdminSuccess,
    logoutAdmin
} = authSliceAdmin.actions

export default authSliceAdmin.reducer

export const selectAuthAdmin = (state: RootState) => state.adminSlice