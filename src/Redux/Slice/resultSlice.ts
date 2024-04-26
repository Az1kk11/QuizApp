import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: any = {
    result: [],
}

export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        pushResultAction: (state, action) => {
            state.result.push(action.payload)
        },
        resetResult: () => {
            return{
                result: []
            }
        }
    }
})

export const { pushResultAction, resetResult } = resultSlice.actions;

export const resultSelect = (state: RootState) => state.resultSlice

export default resultSlice.reducer;
