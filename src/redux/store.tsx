import { configureStore } from '@reduxjs/toolkit';
import sortSlice from './sort/slice';
import filterSlice from './filter/slice';
import ticketsSlice from './ticketsList/slice';


export const store = configureStore({
  reducer: {
    sortSlice,
    filterSlice, 
    ticketsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 