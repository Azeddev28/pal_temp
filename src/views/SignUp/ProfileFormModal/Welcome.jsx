import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import logoImage from '../../../../public/images/logo1.svg';

const Welcome = ({ onContinue }) => {
    return (
        <div className="text-center block">
            <div className="p-4 md:p-10">
                <div className="flex flex-col gap-2 mb-10 items-center justify-center md:mb-14">
                    <div className="w-10 h-auto md:w-14">
                        <Image src={logoImage} alt="..." />
                    </div>
                    <div className="w-fit">
                        <Typography variant={'h4'} className={'font-semibold'}>
                            Welcome to palplug
                        </Typography>
                        <Typography variant={'x-small'}>
                            Let’s get you connected
                        </Typography>
                    </div>
                </div>
                <div className="mb-10 md:mb-16">
                    <Typography variant={'h6'}>
                        Let’s get some more information from you to fill out
                        your profile
                    </Typography>
                </div>

                <Button className="w-full" onClick={onContinue}>
                    <Typography variant={'body'}>Continue</Typography>
                </Button>
            </div>
        </div>
    );
};

export { Welcome };
