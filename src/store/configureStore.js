import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import logger from 'redux-logger';
import charactersReducer from '@/features/characters/charactersSlice'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import episodesReducer from '@/features/episodes/episodesSlice'

const makeStore = () =>
    configureStore({
        reducer: {
            characters: charactersReducer,
            favorites: favoritesReducer,
            episodes: episodesReducer,
          },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            process.env.NODE_ENV === 'development'
              ? getDefaultMiddleware().concat(logger)
              : getDefaultMiddleware(),
    });

export const wrapper = createWrapper(makeStore)
