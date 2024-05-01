import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: any = {
    result: [],
    saveResult: false
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
        },
        resultSaveBc: (state, action) => {
            if(action.payload?.success === true){
                state.saveResult = true
            }else{
                state.saveResult = false
            }
        }

    }
})

export const { pushResultAction, resetResult, resultSaveBc } = resultSlice.actions;

export const resultSelect = (state: RootState) => state.resultSlice

export default resultSlice.reducer;
