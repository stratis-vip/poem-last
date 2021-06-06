import {createSlice} from '@reduxjs/toolkit'

const currentCategorySlice = createSlice({
    name: 'currentCategory',
    initialState: 'all',
    reducers: {
        setCategory: (state, action) => state = action.payload
    }
})

export const {setCategory} = currentCategorySlice.actions
export default currentCategorySlice.reducer