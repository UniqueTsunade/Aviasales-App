import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { Ticket } from "../ticketsList/types";
import { RootState } from "../store";
import { serializedError } from "../../utils/fetchError";

export const fetchSearchId = createAsyncThunk<
  string,
  void,
  { rejectValue: SerializedError }
>("tickets/fetchSearchIdStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://aviasales-test-api.kata.academy/search`
    );
    const { searchId } = response.data;
    return searchId;
  } catch (error: unknown) {
    console.error("Error fetching searchId:", error);

    const fetchSearchIdError = serializedError(error);

    // Returning an error using rejectWithValue
    return rejectWithValue(fetchSearchIdError);
  }
});

export const fetchTickets = createAsyncThunk<
  { tickets: Ticket[]; stop: boolean },
  void,
  { rejectValue: SerializedError;  state: RootState }
>("tickets/fetchTicketsByIdStatus", async (_, { rejectWithValue, getState }) => {
  const { searchId } = getState().ticketsSlice;
  
  try {
    const response = await axios.get(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const { tickets, stop } = response.data;
    return { tickets, stop };
  } catch (error: unknown) {
    console.error("Error fetching tickets:", error);

    const fetchTicketsError = serializedError(error);
    
    return rejectWithValue(fetchTicketsError);
  }
});
