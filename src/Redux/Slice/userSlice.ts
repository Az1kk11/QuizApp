import { RootState } from '../store';
import { setItem } from './../../Helper/persistance-storage';

import { createSlice } from "@reduxjs/toolkit"

interface state {
    isLoading: boolean,
    logedIn: boolean,
    user: null | any
    error: null
}

const initialState: state = {
    isLoading: false,
    logedIn: false,
    user: null,
    error: null
}

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        siginStart: state => {
            state.isLoading = true
        },
        siginSuccess: (state, action) => {
            state.logedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem('token', action.payload.token)
        },
        signFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        logoutUser: state => {
            state.user = null
            state.logedIn = false
        }
    }
})

export const {
    siginStart,
    siginSuccess,
    signFailure,
    logoutUser
} = authUserSlice.actions

export const selectUserSlice = (state: RootState) => state.userSlice

export default authUserSlice.reducer