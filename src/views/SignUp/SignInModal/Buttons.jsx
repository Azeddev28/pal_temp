import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import { getRoute } from '@/api';
import {
    setProfileAlreadyRegistered,
    setSocialAccountAlreadyRegistered,
    setUserRegistrationInfo,
} from '@/store/slices/authSlice';
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useDispatch } from 'react-redux';
import { firebaseAuth } from '@/utils/firebase';

const registerUser = async (
    signupMethod,
    email = null,
    code = null,
    dispatch
) => {
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
        return res
    } catch (error) {
        if (error.response.data.code === 'SOCIAL_ACCOUNT_ALREADY_REGISTERED') {
            dispatch(setSocialAccountAlreadyRegistered());
        }

        if (error.response.data.code === 'PROFILE_ALREADY_REGISTERED') {
            dispatch(setProfileAlreadyRegistered());
        }
    }
};

const GoogleButton = ({waitListEmail}) => {
    const dispatch = useDispatch();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            if(result.user.email !== waitListEmail){
                alert('Email not recognized, please use the same email as waitlist')
                return
            }
            registerUser('Google', result.user.email, undefined, dispatch);
            dispatch(
                setUserRegistrationInfo({
                    displayName: result.user.displayName,
                    email: result.user.email,
                    accessToken: result.user.accessToken,
                    isUserRegistered: result.user.accessToken ? true : false,
                })
            );
        } catch (error) {
            if (
                error.code === 'auth/account-exists-with-different-credential'
            ) {
                // TODO: Handle this error
            } else {
                // Other error occurred
                console.error('Error signing in:', error);
            }
        }
    };

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
};

const LinkedInButton = ({waitListEmail}) => {
    const dispatch = useDispatch();

    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        scope: process.env.NEXT_PUBLIC_LINKEDIN_SCOPE,
        redirectUri: `${
            typeof window === 'object' && window.location.origin
        }/linkedin`,

        onSuccess: async (code) => {
            try {
                const result = await registerUser('Linkedin', undefined, code, dispatch)
                if(result.email !== waitListEmail){
                    alert('Email not recognized, please use the same email as waitlist')
                    return
                }
                dispatch(
                    setUserRegistrationInfo({
                        displayName: result.name,
                        email: result.email,
                        accessToken: result.access_token,
                        isUserRegistered: result.access_token ? true : false,
                }));
            } catch (error) {
                console.log(error);
            }
        },
        closePopupMessage: 'Successfully logged in',
    });
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
};

const GithubButton = ({waitListEmail}) => {
    const dispatch = useDispatch();
    const handleGithubLogin = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            if(result.user.email !== waitListEmail){
                alert('Email not recognized, please use the same email as waitlist')
                return
            }
            registerUser('Github', result.user.email, undefined, dispatch);
         
            dispatch(
                setUserRegistrationInfo({
                    displayName: result.user.displayName,
                    email: result.user.email,
                    accessToken: result.user.accessToken,
                    isUserRegistered: result.user.accessToken ? true : false,
                })
            );
        } catch (error) {
            if (
                error.code === 'auth/account-exists-with-different-credential'
            ) {
                // TODO: Handle this error
            } else {
                // Other error occurred
                console.error('Error signing in:', error);
            }
        }
    };

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
};

export { GithubButton, GoogleButton, LinkedInButton };
