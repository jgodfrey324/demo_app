import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import counterReducer from '@/features/counters/counterSlice'
import productsReducer from '@/features/products/productsSlice'
import logger from 'redux-logger';

const combinedReducer = combineReducers({
    counter: counterReducer,
    products: productsReducer,
  })
  
const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        }
    }
        return combinedReducer(state, action)
    }
  

const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development'
              ? getDefaultMiddleware().concat(logger)
              : getDefaultMiddleware(),
    });

export const wrapper = createWrapper(makeStore)
