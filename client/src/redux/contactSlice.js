import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./actions/contactActions";

const initialState = {
    contacts: {
        availables: [],
        unavailables: [],
    },
    unavailableContacts: [],
    loading: false,
    error: null,
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts.availables = action.payload.availables;
            state.contacts.unavailables = action.payload.unavailables;
        });
        builder.addCase(fetchContacts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default contactSlice.reducer;