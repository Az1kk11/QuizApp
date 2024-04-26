import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import adminSlice from './Slice/adminSlice';
import userSlice from './Slice/userSlice';
import slice from './Slice/slice';
import questionSlice from './Slice/questionSlice';
import resultSlice from './Slice/resultSlice';

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