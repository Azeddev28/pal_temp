import { Button } from '@/components/Button';
import { SERVER_URL } from '@/server';

const GoogleButton = () => (
    <a
        href={`${SERVER_URL}/api/authentication/google-register`}
        target="_blank"
    >
        <Button
            style={{
                backgroundColor: '#5186EC',
                width: '100%',
            }}
            textPosition="left"
            icon="GoogleIcon"
        >
            Sign in with Google
        </Button>
    </a>
);

const LinkedInButton = () => (
    <a href="#">
        <Button
            style={{
                backgroundColor: '#0A66C2',
                width: '100%',
            }}
            textPosition="left"
            icon="LinkedInIcon"
        >
            Sign in with LinkedIn
        </Button>
    </a>
);

const GithubButton = () => (
    <a href="#">
        <Button
            style={{
                backgroundColor: '#1B1817',
                width: '100%',
            }}
            textPosition="left"
            icon="GithubIcon"
        >
            Sign in with Github
        </Button>
    </a>
);

export { GithubButton, GoogleButton, LinkedInButton };
