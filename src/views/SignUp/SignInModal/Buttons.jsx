import { Button } from '@/components/Button';

const GoogleButton = () => (
    <a href="http://103.98.213.146/api/authentication/google-register?callbackURL=http://localhost:3003/">
        <Button
            style={{
                backgroundColor: '#5186EC',
                width: '100%',
            }}
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
            icon="GithubIcon"
        >
            Sign in with Github
        </Button>
    </a>
);

export { GithubButton, GoogleButton, LinkedInButton };
