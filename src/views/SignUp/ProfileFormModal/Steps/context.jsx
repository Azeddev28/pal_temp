import { fetchCompanies, fetchCountries, fetchIndustries, fetchLanguages } from '@/store/slices/formDataSlice';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const StepContext = createContext();

const StepContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    // Fetch data using Redux actions when the component mounts
    useEffect(() => {
        dispatch(fetchCompanies());
        dispatch(fetchIndustries());
        dispatch(fetchCountries());
        dispatch(fetchLanguages());
    }, [dispatch]);

    // Access fetched data from the Redux store
    const companies = useSelector(state => state.formData.companies);
    const industries = useSelector(state => state.formData.industries);
    const countries = useSelector(state => state.formData.countries);
    const languages = useSelector(state => state.formData.languages);

    const context = {
        companies,
        industries,
        countries,
        languages,
    };

    return (
        <StepContext.Provider value={context}>{children}</StepContext.Provider>
    );
};

const useStep = (item) => {
    const context = useContext(StepContext);
    if (typeof context === 'undefined')
        throw new Error(
            'useStep must be used in a child to StepContextProvider'
        );

    return context[item];
};

export { StepContextProvider, useStep };
