import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import { adminSlice, questionSlice, resultSlice, slice, userSlice } from './index'

export const store = configureStore({
    reducer: {
        userSlice,
        adminSlice,
        slice,
        questionSlice,
        resultSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()