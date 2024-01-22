import { Button } from '@/components/Button';
import { setUserRegistrationInfo } from '@/store/authSlice';
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useDispatch, useSelector } from 'react-redux';

const GoogleButton = () => {
    const { firebaseAuthObj } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuthObj, provider);
            dispatch(setUserRegistrationInfo(result.user));
        } catch (error) {
            console.log('🚀 ~ handleGoogleLogin ~ error:', error);
        }
    };

    // <a href={'/api/auth/login'}>
    return (
        <Button
            style={{
                backgroundColor: '#5186EC',
                width: '100%',
            }}
            textPosition="left"
            icon="GoogleIcon"
            onClick={() => handleGoogleLogin()}
        >
            Sign in with Google
        </Button>
    );
    // </a>
};

const LinkedInButton = () => {
    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        scope: 'openid,profile,email',
        redirectUri: `${
            typeof window === 'object' && window.location.origin
        }/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
            console.log({ code });
        },
        onError: (error) => {
            console.log({ error });
        },
        closePopupMessage: 'Successfully logged in',
    });
    // <a href={getRoute('linkedInLink')} target="_blank">
    return (
        <Button
            style={{
                backgroundColor: '#0A66C2',
                width: '100%',
            }}
            textPosition="left"
            icon="LinkedInIcon"
            onClick={() => {
                linkedInLogin();
            }}
        >
            Sign in with LinkedIn
        </Button>
    );
    // </a>
};

const GithubButton = () => {
    const { firebaseAuthObj } = useSelector((state) => state.auth);
    const handleGithubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuthObj, provider);
            console.log('🚀 ~ handleGithubLogin ~ result:', result);
        } catch (error) {
            console.log('🚀 ~ handleGithubLogin ~ error:', error);
        }
    };

    // <a href={getRoute('githubLink')} target="_blank">
    return (
        <Button
            style={{
                backgroundColor: '#1B1817',
                width: '100%',
            }}
            textPosition="left"
            icon="GithubIcon"
            onClick={() => handleGithubLogin()}
        >
            Sign in with Github
        </Button>
    );
    // </a>
};

export { GithubButton, GoogleButton, LinkedInButton };
