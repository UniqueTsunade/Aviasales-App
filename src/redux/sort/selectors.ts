import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSortSlice = (state: RootState) => state.sortSlice;

export const selectOption = createSelector(
    [selectSortSlice],
    (sortSlice) => sortSlice.option
);