import { Button } from '@/components/Button';
import { Radio } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../../../public/images/logo.png';

const Welcome = ({ onContinue }) => {
    return (
        <div className="text-center ">
            <div className="p-10">
                <div className="flex flex-col gap-2 mb-14">
                    <div className="mx-auto w-14 h-auto">
                        {/* TODO: use proper logo. It has no eyes */}
                        <Image src={logo} />
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
                    <Typography variant={'body'}>
                        Let’s get some more information from you to fill out
                        your profile
                    </Typography>
                </div>

                <Button onClick={onContinue} className={'w-full'}>
                    Continue
                </Button>
            </div>
            <div className="w-full border-t border-solid border-grey0 py-8">
                <Typography variant={'small'}>
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

const STEP_COUNT = 8;
const SignUpForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const stepsList = Array(STEP_COUNT)
        .fill(0)
        .map((_, index) => (
            <Step
                key={index}
                onClick={() => setActiveStep(index)}
                className="w-4 h-4"
            />
        ));
    return (
        <div className="p-10">
            <div className="flex flex-row w-52 mx-auto">
                <Stepper joinSteps={true} activeStep={activeStep}>
                    {stepsList}
                </Stepper>
            </div>
            {activeStep === 0 && (
                <div className="py-[70px]">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            How do you identify?
                        </Typography>
                    </div>
                    <div>
                        <Radio />
                    </div>
                </div>
            )}
        </div>
    );
};
const SignInModal = ({ isOpen, onClose }) => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!showSignUpForm && (
                <Welcome onContinue={() => setShowSignUpForm(true)} />
            )}
            {showSignUpForm && <SignUpForm />}
        </Modal>
    );
};

export { SignInModal };
