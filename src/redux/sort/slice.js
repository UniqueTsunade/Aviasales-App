import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    option: null,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeOption: (state, action) => {
      state.option = action.payload;
    },
  },
})

export const { changeOption } = sortSlice.actions;

export default sortSlice.reducer