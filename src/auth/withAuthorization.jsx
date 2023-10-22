import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuthorization = (Component) => {
    return () => {
        const router = useRouter();
        const { isUserRegistered, hasJoinedWaitList } = useSelector((state) => state.auth);
        useEffect(() => {
            if (!isUserRegistered && !hasJoinedWaitList) {
                router.replace('/', undefined, { shallow: true });
            }
        }, []);

        return <Component />;
    };
};

export { withAuthorization };
