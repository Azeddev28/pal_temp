import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { formDataSlice } from "./slices/formDataSlice";



const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [formDataSlice.name]: formDataSlice.reducer
});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
        }
        return nextState;
    } else {
    return rootReducer(state, action)
    }
}

export const makeStore = () => {
    return configureStore({
        reducer: masterReducer,
    });
};


export const wrapper = createWrapper(makeStore, { debug: true });
