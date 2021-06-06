import {createSlice} from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: null,
    reducers: {
        addAllCategories: (state, action) => state = action.payload
    }
})

export const {addAllCategories} = categoriesSlice.actions
export default categoriesSlice.reducer