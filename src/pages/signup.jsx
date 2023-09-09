import { SignUp } from '@/views/SignUp';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        if (!router?.query || !!!router.query.email)
            router?.replace('/', undefined, { shallow: true });
    }, []);
    return <SignUp />;
};

export default Page;
