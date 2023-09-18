import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StepContextProvider } from './Steps/context';
import { Welcome } from './Welcome';
import { STEPS, STEP_COUNT, STEP_TYPE } from './constants';
import { schema } from './schema';

const StepForm = () => {
    const router = useRouter();
    const [stepNumber, setStepNumber] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema[activeStep]),
    });

    const stepsList = Array(STEP_COUNT)
        .fill(0)
        .map((_, index) => <Step key={index} className="w-4 h-4" />);

    const isLastStep = typeof STEPS[activeStep].next === 'undefined';

    const onSubmit = async () => {
        // temporary
        localStorage.setItem('isLoggedIn', true);
        router.push('/congratulations', undefined, { shallow: true });
    };

    const onContinue = () => {
        if (isLastStep) return;
        setStepNumber((prev) => prev + 1);
        const step = STEPS[activeStep];
        if (step.type === STEP_TYPE.Conditional) {
            const fieldValue = methods.watch(step.next.fieldName);
            setActiveStep(step.next.branch[fieldValue]);
        } else {
            setActiveStep(step.next);
        }
    };

    const FormStep = STEPS[activeStep].render;
    return (
        <div className="p-10">
            <div className="flex flex-row w-52 mx-auto">
                <Stepper activeStep={stepNumber}>{stepsList}</Stepper>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <StepContextProvider>
                        <FormStep />
                    </StepContextProvider>
                    <Button
                        type={isLastStep ? 'submit' : 'button'}
                        disabled={!methods.formState.isValid}
                        className={'w-full'}
                        onClick={onContinue}
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
