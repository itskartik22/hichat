import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        removeSelectedChat: (state) => {
            state.selectedChat = null
        }
    }
});

export const { setSelectedChat, removeSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;