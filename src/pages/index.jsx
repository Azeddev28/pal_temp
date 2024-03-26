import { setFirebaseAuth } from '@/store/authSlice';
import app from '@/utils/firebase';
import { Landing } from '@/views/Landing';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Page = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    useEffect(() => {
        if (typeof window !== undefined) {
            dispatch(setFirebaseAuth(auth));
        }
    }, []);
    return <Landing />;
};

export default Page;
