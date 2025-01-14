import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { Ticket } from "./types";
import { RootState } from "../store";
import { serializedError } from "../../utils/fetchError";
import { ticketsSlice } from "./slice";
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
    const fetchSearchIdError = serializedError(error);

    // Returning an error using rejectWithValue
    return rejectWithValue(fetchSearchIdError);
  }
});

export const fetchTickets = createAsyncThunk<
  { tickets: Ticket[]; stop: boolean },
  void,
  { rejectValue: SerializedError; state: RootState }
>(
  "tickets/fetchTicketsByIdStatus",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { searchId } = getState().ticketsSlice;
    let stop = false;
    let retryCount = 0;
    const maxRetries = 10;

    while (!stop && retryCount < maxRetries) {
      try {
        const response = await axios.get(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const { tickets, stop: serverStop } = response.data;
        stop = serverStop;

        dispatch(ticketsSlice.actions.addTickets(tickets));

        if (!stop) {
          continue;
        }

        return { tickets, stop };
      } catch (error: unknown) {
        const fetchSearchIdError = serializedError(error);
        retryCount++;

        if (retryCount >= maxRetries) {
          return rejectWithValue(fetchSearchIdError);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return rejectWithValue({
      name: "FetchError",
      message: "Fetch stopped due to errors",
      stack: "",
      code: "",
    });
  }
);
