import {configureStore} from '@reduxjs/toolkit'
import contentReducer from './content-slice'
import categoriesReducer from './categories-slice'
import currentCategoryReducer from './current-category-slice'
import orderReducer from './order-slice'
import loadingReducer from './loading-slice'

const store = configureStore({
    reducer: {
        content: contentReducer,
        categories: categoriesReducer,
        currentCategory: currentCategoryReducer,
        order: orderReducer,
        loading:loadingReducer
    }
})

export default store