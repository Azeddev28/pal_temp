import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Steps } from './Steps';
import { Welcome } from './Welcome';
import { schema } from './schema';

const StepForm = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema[activeStep]),
    });

    const stepsList = Object.keys(Steps).map((_, index) => (
        <Step
            key={index}
            onClick={() => {
                if (!methods.formState.isValid && index > activeStep) return;
                setActiveStep(index);
            }}
            className="w-4 h-4"
        />
    ));

    const FormStep = Steps[activeStep];

    const onSubmit = async () => {
        router.push('/congratulations', undefined, { shallow: true });
    };
    return (
        <div className="p-10">
            <div className="flex flex-row w-52 mx-auto">
                <Stepper
                    joinSteps={true}
                    activeStep={activeStep}
                    isLastStep={() => setIsLastStep(true)}
                >
                    {stepsList}
                </Stepper>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormStep />
                    <Button
                        type={isLastStep ? 'submit' : 'button'}
                        disabled={!methods.formState.isValid}
                        className={'w-full'}
                        onClick={() => {
                            if (isLastStep) return;
                            setActiveStep(activeStep + 1);
                        }}
                    >
                        {isLastStep ? 'Submit' : 'Continue'}
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};

const SignUpModalForm = ({ isOpen, onClose }) => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!showSignUpForm && (
                <Welcome onContinue={() => setShowSignUpForm(true)} />
            )}
            {showSignUpForm && <StepForm />}
        </Modal>
    );
};

export { SignUpModalForm };
