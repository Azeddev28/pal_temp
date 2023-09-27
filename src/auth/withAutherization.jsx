import { useSession } from '@/hooks/use-session';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAutherization = (Component) => {
    return () => {
        const { data: session } = useSession();
        const router = useRouter();
        useEffect(() => {
            const isLoggedIn = !!session;
            if (!isLoggedIn) router.replace('/', undefined, { shallow: true });
        }, []);

        return <Component />;
    };
};

export { withAutherization };
