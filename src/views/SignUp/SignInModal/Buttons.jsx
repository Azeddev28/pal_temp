import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import { getRoute } from '@/server';
import { setUserRegistrationInfo } from '@/store/authSlice';
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useDispatch, useSelector } from 'react-redux';

const submitDetails = async (signupMethod, email, code, router) => {
    var socialRegisterPayload = {
        social_registration_type: signupMethod,
        email: email,
    };
    var socialRoute = getRoute('socialRegister');
    if (signupMethod === 'Linkedin') {
        socialRegisterPayload['authorization_code'] = code;
        socialRoute = getRoute('linkedinRegister');
    }
    try {
        const res = await postRequest(socialRoute, socialRegisterPayload);
        const dataToSave = {
            displayName: res.given_name,
            email: res.email,
            accessToken: code,
        };
        return dataToSave;
    } catch (error) {
        if (error.response.data.code === 'USER_ALREADY_REGISTERED') {
            router.push('/congratulations', undefined, {
                shallow: true,
            });
        }
    }
};

const GoogleButton = () => {
    const { firebaseAuthObj } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuthObj, provider);
            submitDetails('Google', result.user.email, undefined, router);
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
    const dispatch = useDispatch();
    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        scope: 'openid,profile,email',
        redirectUri: `${
            typeof window === 'object' && window.location.origin
        }/linkedin`,
        onSuccess: async (code) => {
            try {
                submitDetails('Linkedin', undefined, code)
                    .then((data) => {
                        dispatch(setUserRegistrationInfo(data));
                    })
                    .catch((error) => {
                        console.log('🚀 ~ onSuccess: ~ error:', error);
                    });
            } catch (error) {}
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
    const dispatch = useDispatch();
    const router = useRouter();
    const handleGithubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuthObj, provider);
            submitDetails('Github', result.user.email, undefined, router);
            dispatch(setUserRegistrationInfo(result.user));
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
