import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const CustomQueryClientProvider = ({ children }) => {
    const [reactQueryClient] = useState(new QueryClient());

    return (
        <QueryClientProvider client={reactQueryClient}>
            {children}
        </QueryClientProvider>
    );
};

export { CustomQueryClientProvider };
