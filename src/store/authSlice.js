import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
    authState: false,
    accessToken: null,
    isUserRegistered: false,
    firstName: '',
    lastName: '',
    email: '',
};

// Actual Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthState(state, action) {
            state.authState = action.payload;
        },
        setEventMessage(state, action) {
            state.firstName = action.payload.first_name;
            state.email = action.payload.email;
            state.lastName = action.payload.last_name;
            state.accessToken = action.payload.access_token;
            state.isUserRegistered = action.payload.access_token ? true : false;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { setAuthState, setEventMessage } = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;

export default authSlice.reducer;
