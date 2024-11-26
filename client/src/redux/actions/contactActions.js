import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/BaseUrl";

export const fetchContacts = createAsyncThunk("contact/fetchContacts", async (search = "", { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${baseUrl}/api/user/contacts?search=${search}`,
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addContact = createAsyncThunk("contact/addContact", async (data, { rejectWithValue }) => {
    try {
        await axios({
            method: "POST",
            url: `${baseUrl}/api/contacts`,
            data,
            withCredentials: true,
        });
        return;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
