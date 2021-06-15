import {createSlice} from '@reduxjs/toolkit'

const minMaxByCategoriesSlice = createSlice({
    name: 'minMaxByCategories',
    initialState: null,
    reducers: {
        addAllMinMaxByCategories: (state, action) => state = action.payload
    }
})

export const {addAllMinMaxByCategories} = minMaxByCategoriesSlice.actions
export default minMaxByCategoriesSlice.reducer