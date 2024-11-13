import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearchId = createAsyncThunk(
    'tickets/fetchSearchIdStatus',
    async () => {
        const response = await axios.get(`https://aviasales-test-api.kata.academy/search`);
        const { searchId } = response.data;
        console.log(typeof searchId);
        return searchId;
    }
)

export const fetchTickets = createAsyncThunk(
    'tickets/fetchTicketsByIdStatus',
    async (searchId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const { tickets, stop } = response.data;
            console.log(tickets, stop);
            return { tickets, stop };
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);



