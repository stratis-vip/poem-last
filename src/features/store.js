import {configureStore} from '@reduxjs/toolkit'
import categoriesReducer from './categories-slice'
import currentCategoryReducer from './current-category-slice'
import orderReducer from './order-slice'
import infoReducer from './info-slice'
import minMaxByCategoryReducer from './minmax-slice'
import refetchQueriesReducer from './refetch-slice'

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        currentCategory: currentCategoryReducer,
        order: orderReducer,
        info: infoReducer,
        minMaxByCategory:minMaxByCategoryReducer,
        refetchQueries:refetchQueriesReducer
    }
})

export default store