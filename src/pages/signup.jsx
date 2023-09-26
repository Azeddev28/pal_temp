import { useSession } from '@/hooks/use-session';
import { useUserProfile } from '@/hooks/use-user-profile';
import { updateProfile } from '@/providers/user-profile/creators';
import { SignUp } from '@/views/SignUp';
import { useEffect } from 'react';

export const getServerSideProps = async (ctx) => {
    const { session, ...queryParams } = ctx.query;
    return {
        props: {
            queryParams,
            session,
        },
    };
};

const Page = ({ queryParams, session }) => {
    const { dispatch } = useUserProfile();
    const { update: updateSession } = useSession();

    useEffect(() => {
        updateSession(session);
        dispatch(updateProfile(queryParams));
    }, []);

    return <SignUp />;
};

export default Page;
