import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transfers: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    initializeTransfers: (state, action) => {
      state.transfers = action.payload.map(({ value, label }) => ({
        value,
        label,
        checked: true,
      }));
    },
    addTransfers: (state, action) => {
      const transferValue = action.payload;
      const isAllTransfer = transferValue === "all";
      const allTransfer = state.transfers.find((item) => item.value === "all");

      if (isAllTransfer) {
        const allChecked = allTransfer.checked;

        // Set checked for all elements depending on the "all" state
        state.transfers.forEach((transfer) => {
          transfer.checked = !allChecked;
        });
      } else {
        const index = state.transfers.findIndex(
          (transfer) => transfer.value === transferValue
        );

        if (index !== -1) {
          // Toggle checked for the selected element
          state.transfers[index].checked = !state.transfers[index].checked;

          // Reset "all" to false if something else is selected
          if (allTransfer) allTransfer.checked = false;

          // Checking whether checked should be set to "all"
          const test = state.transfers.filter(
            (transfer) => transfer.checked === false
          );
          if (test.length === 1) {
            // If all transfers except "all" have checked set to true, then set true and "all"
            allTransfer.checked = true;
          }
        }
      }
    },
  },
});

export const { addTransfers, initializeTransfers } = filterSlice.actions;
export default filterSlice.reducer;
