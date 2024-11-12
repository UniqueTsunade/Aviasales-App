import { configureStore } from '@reduxjs/toolkit';
import sortSlice from './sort/slice';
import filterSlice from './filter/slice';


export const store = configureStore({
  reducer: {
    sortSlice,
    filterSlice
  },
})