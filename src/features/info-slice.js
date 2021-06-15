import {createSlice} from '@reduxjs/toolkit'

const infoSlice = createSlice({
    name: 'info',
    initialState: null,
    reducers: {
        addAllInfo: (state, action) => state = action.payload
    }
})

export const {addAllInfo} = infoSlice.actions
export default infoSlice.reducer