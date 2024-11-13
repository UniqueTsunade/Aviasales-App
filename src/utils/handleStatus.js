export const handlePending = (state) => {
  state.status = "loading";
};

export const handleFulfilled = (state) => {
  state.status = "success";
};

export const handleRejected = (state) => {
  state.status = "error";
};
