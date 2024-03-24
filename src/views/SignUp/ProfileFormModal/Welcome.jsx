import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import logoImage from '../../../../public/images/logo1.svg';

const Welcome = ({ onContinue }) => {
    return (
        <div className="text-center block">
            <div className="p-10">
                <div className="flex flex-col gap-2  items-center justify-center mb-[92px]">
                    <div className="w-10 h-auto md:w-14">
                        <Image src={logoImage} alt="..." />
                    </div>
                    <div className="w-fit">
                        <p className={'font-semibold text-2xl'}>
                            Welcome to palplug
                        </p>
                        <p className="text-xs font-normal">
                            Let’s get you connected
                        </p>
                    </div>
                </div>
                <div className="mb-32">
                    <p className={'text-lg font-normal leading-[1.125]'}>
                        Let’s get some more information from you to fill out
                        your profile
                    </p>
                </div>

                <Button className="w-full" onClick={onContinue}>
                    <Typography variant={'body'}>Continue</Typography>
                </Button>
            </div>
        </div>
    );
};

export { Welcome };
