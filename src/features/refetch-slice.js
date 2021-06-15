import {createSlice} from '@reduxjs/toolkit'

const refetchQueriesSlice = createSlice({
    name: 'refetchQueries',
    initialState: {statistics: false, poems: false},
    reducers: {
        refetchAll: (state) => {
            return {statistics: true, poems: true}
        },
        setStatisticsRefetch: (state, {payload}) => {
            return {...state, statistics: payload}
        },
        setPoemsRefetch: (state, {payload}) => {
            return {...state, poems: payload}
        }
    }
})

export const {refetchAll, setStatisticsRefetch, setPoemsRefetch} = refetchQueriesSlice.actions
export default refetchQueriesSlice.reducer