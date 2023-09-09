import { useRouter } from 'next/router';
import { useEffect } from 'react';

// This is temporary athentication logic
const withAutherization = (Component) => {
    return () => {
        const router = useRouter();
        useEffect(() => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) router.replace('/', undefined, { shallow: true });
        }, []);

        return <Component />;
    };
};

export { withAutherization };
