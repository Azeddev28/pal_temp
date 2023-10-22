import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuthorization = (Component) => {
    return () => {
        const router = useRouter();
        const { isUserRegistered } = useSelector((state) => state.auth);
        useEffect(() => {
            if (!isUserRegistered) {
                router.replace('/', undefined, { shallow: true });
            }
        }, []);

        return <Component />;
    };
};

export { withAuthorization };
