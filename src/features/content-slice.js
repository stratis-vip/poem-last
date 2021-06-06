import {createSlice} from '@reduxjs/toolkit'

const contentSlice = createSlice({
    name: 'content',
    initialState: null,
    reducers:{
        addAllPoems: (state, action) => state = action.payload
    }
})

export const {addAllPoems} = contentSlice.actions
export default contentSlice.reducer