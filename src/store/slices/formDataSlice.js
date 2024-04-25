import { getRoute } from '@/api';
import { getRequest } from '@/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCompanies = createAsyncThunk('data/fetchCompanies', async () => {
    return getRequest(getRoute('companiesList'));
});

export const fetchIndustries = createAsyncThunk('data/fetchIndustries', async () => {
    return getRequest(getRoute('industriesList'));
});

export const fetchCountries = createAsyncThunk('data/fetchCountries', async () => {
    return getRequest(getRoute('countriesList'));
});

export const fetchLanguages = createAsyncThunk('data/fetchLanguages', async () => {
    return getRequest(getRoute('languagesList'));
});

// Define a data slice using createSlice
export const formDataSlice = createSlice({
    name: 'formData',
    initialState: {
        companies: [],
        industries: [],
        countries: [],
        languages: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Reducer for handling loading state when async actions start
        setLoading: (state) => {
            state.loading = true;
        },
        // Reducer for handling loading state when async actions complete successfully
        setLoadingFalse: (state) => {
            state.loading = false;
        },
        // Reducer for handling loading state when async actions encounter errors
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Reducers for updating state with fetched data
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setIndustries: (state, action) => {
            state.industries = action.payload;
        },
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle actions for fetching companies
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle actions for fetching industries
            .addCase(fetchIndustries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchIndustries.fulfilled, (state, action) => {
                state.loading = false;
                state.industries = action.payload;
            })
            .addCase(fetchIndustries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle actions for fetching countries
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle actions for fetching languages
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

