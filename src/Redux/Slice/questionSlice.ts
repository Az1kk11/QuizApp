import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState = {
    questionArr: [],
    trace: 1
}

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamAction: (state, action) => {
            state.questionArr = action.payload.data.questions
        },
        nextQuestions: (state) => {
            state.trace += 1
            if(state.trace === 11){
                state.trace = 1
            }
        },
        resetQuestions: () => {
            return {
                questionArr: [],
                trace: 1
            }
        }
    }
})

export const { startExamAction, nextQuestions, resetQuestions } = questionSlice.actions;

export const selectQuestion = (state: RootState) => state.questionSlice

export default questionSlice.reducer;