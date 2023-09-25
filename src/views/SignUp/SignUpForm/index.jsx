import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useMutation } from '@/hooks/react-query';
import { StepContextProvider } from './Steps/context';
import { Welcome } from './Welcome';
import { STEPS, STEP_COUNT, STEP_TYPE } from './constants';
import { schema } from './schema';

const StepForm = () => {
    const router = useRouter();
    const { mutateAsync: registerProfile } = useMutation('profileRegister');
    const [activeStep, setActiveStep] = useState(0);
    const [visitedSteps, setVisitedSteps] = useState([activeStep]);

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema[activeStep]),
    });

    const isLastStep = typeof STEPS[activeStep]?.next === 'undefined';

    const getNextStep = () => {
        const step = STEPS[activeStep];
        if (step.type === STEP_TYPE.Linear) return step.next;
        const fieldValue = methods.watch(step.next.fieldName);
        const nextStep = step.next.branch[fieldValue];
        return nextStep;
    };

    const onSubmit = async (formData) => {
        const email = router.query.email;
        try {
            await registerProfile({ ...formData, email });
            router.push('/congratulations', undefined, { shallow: true });
        } catch (e) {
            console.error(e);
        }
    };

    const onContinue = () => {
        if (isLastStep) return;
        const nextStep = getNextStep();
        const isAleadyVisitedStep = visitedSteps.includes(nextStep);
        if (!isAleadyVisitedStep) setVisitedSteps([...visitedSteps, nextStep]);
        setActiveStep(nextStep);
    };

    const FormStep = STEPS[activeStep].render;
    return (
        <div className="p-10">
            <div className="flex flex-row w-52 mx-auto">
                <Stepper activeStep={visitedSteps.indexOf(activeStep)}>
                    {Array(STEP_COUNT)
                        .fill(0)
                        .map((_, index) => (
                            <Step
                                onClick={
                                    typeof visitedSteps[index] !== 'undefined'
                                        ? () =>
                                              setActiveStep(visitedSteps[index])
                                        : undefined
                                }
                                key={index}
                                className="w-4 h-4"
                            />
                        ))}
                </Stepper>
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

const ProfileModalForm = ({ isOpen, onClose }) => {
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

export { ProfileModalForm };
