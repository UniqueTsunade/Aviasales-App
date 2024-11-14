export const handlePendingID = (state) => {
  state.status = "loading";
};

export const handlePendingTickets = (state) => {
  state.status = "loading";
  state.error = null;
};

export const handleFulfilled = (state) => {
  state.status = "success";
};

export const handleRejected = (state, action) => {
  state.status = "error";
  console.error('Error fetching search ID:', action.error);
};

export const handleRejectedTickets = (state, action) => {
  state.status = "error";
  state.error = 'Failed to load tickets.';
  console.error('Error fetching Tickets:', action.error);
};
