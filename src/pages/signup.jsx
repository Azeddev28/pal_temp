import { useSession } from '@/hooks/use-session';
import { useUserProfile } from '@/hooks/use-user-profile';
import { updateProfile } from '@/providers/user-profile/creators';
import { SignUp } from '@/views/SignUp';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getServerSideProps = async (ctx) => {
    const { session, ...queryParams } = ctx.query;
    return {
        props: {
            queryParams,
            session: session ?? '',
        },
    };
};

const Page = ({ queryParams, session }) => {
    const router = useRouter();
    const { profile, dispatch } = useUserProfile();
    const { update: updateSession } = useSession();

    const clearQueryParams = () =>
        router.replace('/signup', undefined, { shallow: true });
    const redirectToHome = () =>
        router.replace('/', undefined, { shallow: true });

    useEffect(() => {
        if (!profile.email && !queryParams?.email) redirectToHome();
        updateSession(session);
        dispatch(updateProfile(queryParams));
        clearQueryParams();
    }, []);

    return <SignUp />;
};

export default Page;
