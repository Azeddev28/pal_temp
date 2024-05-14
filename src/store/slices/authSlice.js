import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
    authState: false,
    accessToken: null,
    isUserRegistered: false,
    hasJoinedWaitList: false,
    firstName: '',
    lastName: '',
    email: '',
    scrollContact: false,
    scrollWorking: false,
    suggestionListVisibility: true,
    profileAlreadyRegistered: false,
    socialAccountAlreadyRegistered: false,
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
            if (action.payload) {
                state.firstName = action.payload.displayName ? action.payload.displayName.split(' ')[0] : "";
                state.email = action.payload.email;
                state.lastName = action.payload.displayName ? action.payload.displayName.split(' ')[1] : "";
                state.accessToken = action.payload?.accessToken;
                state.isUserRegistered = action.payload.isUserRegistered;
            }
        },
        setIsUserRegistered(state) {
            state.isUserRegistered = true;
        },
        setHasJoinedWaitlist(state) {
            state.hasJoinedWaitList = true;
        },
        setScrollStateContact(state, action) {
            state.scrollContact = action.payload;
        },
        setScrollStateWorking(state, action) {
            state.scrollWorking = action.payload;
        },
        setSuggestionListVisibility(state) {
            state.suggestionListVisibility = !state.suggestionListVisibility;
        },
        setProfileAlreadyRegistered(state) {
            console.log("AJAO")
            state.profileAlreadyRegistered = true;
        },
        setSocialAccountAlreadyRegistered(state) {
            state.socialAccountAlreadyRegistered = true;
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
    setScrollStateContact,
    setScrollStateWorking,
    setSuggestionListVisibility,
    setProfileAlreadyRegistered,
    setSocialAccountAlreadyRegistered
} = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;

export default authSlice.reducer;
