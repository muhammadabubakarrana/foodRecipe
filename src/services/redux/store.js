import {configureStore} from '@reduxjs/toolkit';
import ThemeReducer from './ThemeSlice';
export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;
