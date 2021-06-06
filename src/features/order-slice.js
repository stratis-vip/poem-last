import {createSlice} from '@reduxjs/toolkit'
import {TypeOrder} from "../utils";

const orderSlice = createSlice({
    name: 'order',
    initialState: TypeOrder.desc,
    reducers: {
        setOrder: (state, action) => state = action.payload
    }
})

export const {setOrder} = orderSlice.actions
export default orderSlice.reducer