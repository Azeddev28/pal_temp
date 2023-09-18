import { useQuery } from '@/hooks/react-query';
import { createContext, useContext } from 'react';

const StepContext = createContext();

const StepContextProvider = ({ children }) => {
    const { data: companies, isLoading: isLoadingCompanies } = useQuery([
        '/api/companies/companies-list/',
    ]);

    const { data: industries, isLoading: isLoadingIndustries } = useQuery([
        '/api/companies/industries-list/',
    ]);

    const { data: countries, isLoading: isLoadingCountries } = useQuery([
        '/api/locations/countries-list/',
    ]);

    const { data: languages, isLoading: isLoadingLanguages } = useQuery([
        '/api/locations/languages-list/',
    ]);

    // step# : context/data
    const context = {
        companies: [companies, isLoadingCompanies],
        industries: [industries, isLoadingIndustries],
        countries: [countries, isLoadingCountries],
        languages: [languages, isLoadingLanguages],
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
