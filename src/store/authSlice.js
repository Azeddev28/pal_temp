import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
    authState: false,
    accessToken: null,
    isUserRegistered: false,
    hasJoinedWaitList: false,
    firstName: 'w',
    lastName: '',
    email: '',
    firebaseAuthObj: null,
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
        setUserRegistrationInfo(state, action) {
            state.firstName = action.payload.displayName.split(' ')[0];
            state.email = action.payload.email;
            state.lastName = action.payload.displayName.split(' ')[1];
            state.accessToken = action.payload.accessToken;
            state.isUserRegistered = action.payload.accessToken ? true : false;
        },
        setIsUserRegistered(state) {
            state.isUserRegistered = true;
        },
        setHasJoinedWaitlist(state) {
            state.hasJoinedWaitList = true;
        },
        setFirebaseAuth(state, action) {
            state.firebaseAuthObj = action.payload;
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

export const {
    setAuthState,
    setUserRegistrationInfo,
    setIsUserRegistered,
    setHasJoinedWaitlist,
    setFirebaseAuth,
} = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;

export default authSlice.reducer;
