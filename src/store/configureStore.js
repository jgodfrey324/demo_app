import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import counterReducer from '@/features/counters/counterSlice'
import logger from 'redux-logger';

const makeStore = () =>
    configureStore({
        reducer: {
            counter: counterReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development'
              ? getDefaultMiddleware().concat(logger)
              : getDefaultMiddleware(),
    });

export const wrapper = createWrapper(makeStore)
