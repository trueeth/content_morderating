import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import appReducer, { IAppSlice } from './reducers';
import { useDispatch } from 'react-redux';

// Define the shape of the Redux state
export interface IReduxState {
  app: IAppSlice;
}

// Configure the Redux store with appReducer and additional middleware
const store = configureStore({
  reducer: {
    app: appReducer,
  },
  // Use getDefaultMiddleware to apply additional middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware),
});

// Define the types for RootState and AppDispatch based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to access the dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Export the configured store as the default export
export default store;
