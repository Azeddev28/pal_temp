import { ArrowLeftIcon } from '@/Icons';
import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { getRoute } from '@/api';
import { setSuggestionListVisibility } from '@/store/slices/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { StepContextProvider } from './Steps/context';
import { Welcome } from './Welcome';
import { STEPS, STEP_COUNT, STEP_TYPE } from './constants';
import { schema } from './schema';
import { useUserProfile } from '@/hooks/use-user-profile';

const StepForm = () => {
    const dispatch = useDispatch();
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
            country: formData.country?.value,
            email: formData.email,
            another_gender: formData.anotherGender,
            company: formData.company,
            gender: formData.gender,
            industry: formData.industry?.value,
            interested_job_title: formData.interestedJobTitle?.value,
            job_title: formData.jobTitle?.value,
            language: formData.language?.value,
            role: formData.purpose,
        };

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
        const isAlreadyVisitedStep = visitedSteps.includes(nextStep);
        if (!isAlreadyVisitedStep) setVisitedSteps([...visitedSteps, nextStep]);
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

    const handleSuggestionListVisibility = () => {
        dispatch(setSuggestionListVisibility());
    };

    const FormStep = STEPS[activeStep]?.component;

    const handleValidations = () => {
        const values = methods.getValues();

        const validationMap = {
            0: () => !values.gender,
            1: () => !(values.country && values.language),
            2: () => !(values.firstName && values.lastName),
            3: () => !values.purpose,
            4: () => !(values.company || values.jobTitle),
            5: () => !(values.industry || values.interestedJobTitle),
        };

        const validate = validationMap[activeStep];
        return validate ? validate() : false;
    };
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
                    <Stepper activeStep={visitedSteps?.indexOf(activeStep)}>
                        {Array(STEP_COUNT)
                            ?.fill(0)
                            ?.map((_, index) => (
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
                        onClick={handleSuggestionListVisibility}
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="h-[93%] flex flex-col max-h-[398px] min-h-[398px] justify-between"
                    >
                        <StepContextProvider>
                            <FormStep slideDirection={slideDirection} />
                        </StepContextProvider>
                        <Button
                            type="button"
                            disabled={handleValidations()}
                            className={'w-full'}
                            onClick={() => {
                                if (isLastStep) {
                                    onSubmit(methods.getValues());
                                } else {
                                    onContinue();
                                }
                            }}
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
