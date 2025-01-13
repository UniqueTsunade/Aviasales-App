import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortSliceState } from './types';

const initialState: SortSliceState = {
    option: null
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeOption: (state, action: PayloadAction<string>) => {
      state.option = action.payload;
    },
  },
})

export const { changeOption } = sortSlice.actions;

export default sortSlice.reducer