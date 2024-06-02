import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState = {
    categories: [],
}

export const categoriesSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {

        categorie: (state, action) => {
            state.categories = action.payload
        },
    }
})

export const { categorie } = categoriesSlice.actions

export const select = (state: RootState) => state.slice

export default categoriesSlice.reducer