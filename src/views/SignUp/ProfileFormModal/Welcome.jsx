import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../../../public/images/logo.png';

const Welcome = ({ onContinue }) => {
    return (
        <div className="text-center ">
            <div className="p-10">
                <div className="flex flex-col gap-2 mb-14">
                    <div className="mx-auto w-14 h-auto">
                        {/* TODO: use proper logo. It has no eyes */}
                        <Image src={logoImage} alt="..." />
                    </div>
                    <div>
                        <Typography variant={'h4'} className={'font-semibold'}>
                            Welcome to palplug
                        </Typography>
                        <Typography variant={'x-small'}>
                            Let’s get you connected
                        </Typography>
                    </div>
                </div>
                <div className="mb-16">
                    <Typography variant={'h6'}>
                        Let’s get some more information from you to fill out
                        your profile
                    </Typography>
                </div>

                <Button onClick={onContinue} className={'w-full'}>
                    Continue
                </Button>
            </div>
            <div className="w-full border-t border-solid border-grey0 py-8">
                <Typography variant={'body'}>
                    Already a member?{' '}
                    <Link
                        href="#"
                        className="text-brandBlue hover:text-hoverBlue font-semibold"
                    >
                        Sign in
                    </Link>
                </Typography>
            </div>
        </div>
    );
};

export { Welcome };
