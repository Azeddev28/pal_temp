import { SessionContext } from '@/providers/session';
import { useContext } from 'react';

const useSession = () => {
    const context = useContext(SessionContext);
    if (typeof context === 'undefined')
        throw new Error(
            'useSession hook should only be used in child component of SessionProvider'
        );
    return context;
};

export { useSession };
