import { ArrowLeftIcon } from '@/Icons';
import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { useUserProfile } from '@/hooks/use-user-profile';
import { getRoute } from '@/server';
import { useUser } from '@auth0/nextjs-auth0/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { StepContextProvider } from './Steps/context';
import { Welcome } from './Welcome';
import { STEPS, STEP_COUNT, STEP_TYPE } from './constants';
import { schema } from './schema';

const StepForm = () => {
    const { firstName, lastName, email } = useSelector((state) => state.auth);
    const { profile } = useUserProfile();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [visitedSteps, setVisitedSteps] = useState([activeStep]);
    const [slideDirection, setSlideDirection] = useState('left');
    const methods = useForm({
        defaultValues: { ...profile, firstName, lastName, email },
        mode: 'onChange',
        resolver: yupResolver(schema[activeStep]),
    });
    console.log(
        '🚀 ~ StepForm ~ methods:',
        methods.formState,
        methods.formState.isValid,
        methods.formState.errors.length === 0 ? true : false
    );

    const { user, error, isLoading } = useUser();

    const isLastStep = typeof STEPS[activeStep]?.next === 'undefined';

    const getNextStep = () => {
        const step = STEPS[activeStep];
        if (step.type === STEP_TYPE.Linear) return step.next;
        const fieldValue = methods.watch(step.next.fieldName);
        const nextStep = step.next.branch[fieldValue];
        return nextStep;
    };

    const onSubmit = async (formData) => {
        const dataToSend = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            country: formData.country,
            email: user ? user.email : formData.email,
            another_gender: formData.anotherGender,
            company: formData.company,
            gender: formData.gender,
            industry: formData.industry,
            interested_job_title: formData.interestedJobTitle,
            job_title: formData.jobTitle,
            language: formData.language,
            role: formData.purpose,
        };
        console.log('🚀 ~ onSubmit ~ dataToSend:', dataToSend);
        postRequest(getRoute('profileRegister'), dataToSend, true)
            .then((res) => {
                router.push('/congratulations', undefined, { shallow: true });
            })
            .catch(({ response }) => {
                if (response.status === 400) {
                    router.push('/congratulations', undefined, {
                        shallow: true,
                    });
                }
                if (response.data.non_field_errors) {
                    if (response.data.non_field_errors.length > 0)
                        router.push('/', undefined, {
                            shallow: true,
                        });
                }
            });
    };

    const onContinue = () => {
        if (isLastStep) return;
        setSlideDirection('left');
        const nextStep = getNextStep();
        const isAleadyVisitedStep = visitedSteps.includes(nextStep);
        if (!isAleadyVisitedStep) setVisitedSteps([...visitedSteps, nextStep]);
        setActiveStep(nextStep);
    };

    const onStepClick = (index) => {
        if (typeof visitedSteps[index] !== 'undefined') {
            setSlideDirection('right');
            setActiveStep(visitedSteps[index]);
            const slicedVisitedSteps = visitedSteps.slice(0, index + 1);
            setVisitedSteps(slicedVisitedSteps);
        }
    };

    const onBackClick = () => {
        // REMOVE CURRENT STEP FROM THE LIST
        if (visitedSteps.length === 1) return;
        visitedSteps.pop();
        const previousStep = visitedSteps[visitedSteps.length - 1];
        setActiveStep(previousStep);
    };

    const FormStep = STEPS[activeStep].component;
    return (
        <>
            <div>
                {activeStep !== 0 && (
                    <ArrowLeftIcon
                        className="w-4 h-4 md:w-6 md:h-6 absolute top-[18px] left-3 cursor-pointer text-brandBlue"
                        onClick={onBackClick}
                    />
                )}
            </div>
            <div className="p-10 h-full flex flex-col justify-between">
                <div className="flex flex-row w-32 md:w-48 mx-auto">
                    <Stepper activeStep={visitedSteps.indexOf(activeStep)}>
                        {Array(STEP_COUNT)
                            .fill(0)
                            .map((_, index) => (
                                <Step
                                    onClick={() => onStepClick(index)}
                                    key={index}
                                    className="w-3 h-3 md:w-4 md:h-4"
                                />
                            ))}
                    </Stepper>
                </div>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="h-[93%]"
                    >
                        <StepContextProvider>
                            <FormStep slideDirection={slideDirection} />
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
        </>
    );
};

const ProfileFormModal = ({ isOpen, onClose }) => {
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

export { ProfileFormModal };
