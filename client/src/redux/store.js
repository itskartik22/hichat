import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import contactReducer from "./contactSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        contact: contactReducer,
    },
})