import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectFilterSlice = (state: RootState) => state.filterSlice;

export const selectTransfers = createSelector(
  [selectFilterSlice],
  (filterSlice) => filterSlice.transfers
);
