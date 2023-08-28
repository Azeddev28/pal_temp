import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Radio, Text } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Step, Stepper } from '@/components/Stepper';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const STEP_COUNT = 8;
const SignUpForm = ({ onSubmit }) => {
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
    const [showGenderInput, setShowGenderInput] = useState(false);

    const [formData, setFormData] = useState({});

    const handleFieldChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    return (
        <div className="p-10">
            <div className="flex flex-row w-52 mx-auto">
                <Stepper joinSteps={true} activeStep={activeStep}>
                    {stepsList}
                </Stepper>
            </div>

            {activeStep === 0 && (
                <div className="pt-12 pb-64">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            How do you identify?
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-6">
                        <Radio
                            id="male"
                            name="gender"
                            value="male"
                            label="Male"
                            onChange={handleFieldChange}
                            onClick={() => setShowGenderInput(false)}
                        />

                        <Radio
                            id="female"
                            name="gender"
                            value="female"
                            label="Female"
                            onChange={handleFieldChange}
                            onClick={() => setShowGenderInput(false)}
                        />
                        {!showGenderInput ? (
                            <Radio
                                id="another"
                                name="gender"
                                value="another"
                                label="Specify Another"
                                onChange={handleFieldChange}
                                onClick={() => setShowGenderInput(true)}
                            />
                        ) : (
                            <Text
                                name="gender"
                                placeholder={'Enter your gender...'}
                                onChange={handleFieldChange}
                            />
                        )}
                    </div>
                </div>
            )}
            {activeStep === 1 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            Pick your language and country/region
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Dropdown
                            width={'100%'}
                            name="language"
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    language: option,
                                })
                            }
                            options={[
                                { key: 'English(US)', value: 'english' },
                                { key: 'Japanese', value: 'jp' },
                            ]}
                            selectedKey={
                                formData.language?.key ?? 'English(US)'
                            }
                        />
                        <Dropdown
                            width={'100%'}
                            name="country"
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    country: option,
                                })
                            }
                            options={[
                                { key: 'United States', value: 'us' },
                                { key: 'Japan', value: 'jp' },
                            ]}
                            selectedKey={
                                formData.country?.key ?? 'United States'
                            }
                        />
                    </div>
                </div>
            )}
            {activeStep === 2 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            What is your name?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Text
                            id="first-name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleFieldChange}
                            placeholder={'Jhon'}
                            label={'First name'}
                        />
                        <Text
                            id="last-name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleFieldChange}
                            placeholder={'Doe'}
                            label={'Last name'}
                        />
                    </div>
                </div>
            )}
            {activeStep === 3 && (
                <div className="pt-12">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            What are you looking to do on palplug?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Radio
                            id="be-a-palplug"
                            name="purpose"
                            onChange={handleFieldChange}
                            value="I want to be a plug"
                            label="I want to be a plug"
                        />

                        <Radio
                            id="looking-for-a-palplug"
                            name="purpose"
                            onChange={handleFieldChange}
                            value="I'm looking for a palplug"
                            label="I'm looking for a palplug"
                        />
                    </div>
                </div>
            )}
            {activeStep === 4 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            Where do you work?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Dropdown
                            width={'100%'}
                            name="company"
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    company: option,
                                })
                            }
                            selectedKey={formData.company?.key}
                            placeholder={'Select your company'}
                            options={[
                                { key: 'Google', value: 'google' },
                                { key: 'Meta', value: 'meta' },
                                { key: 'Amazon', value: 'amazon' },
                                { key: 'Netflix', value: 'netflix' },
                            ]}
                        />
                    </div>
                </div>
            )}
            {activeStep === 5 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            What field are you interested in working in?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Dropdown
                            width={'100%'}
                            name="industry"
                            placeholder={'Select your industry'}
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    industry: option,
                                })
                            }
                            selectedKey={formData.industry?.key}
                            options={[
                                { key: 'Tech', value: 'tech' },
                                { key: 'Commerce', value: 'commerce' },
                                { key: 'Medicine', value: 'medicine' },
                                {
                                    key: 'Engineering',
                                    value: 'engineering',
                                },
                            ]}
                        />
                    </div>
                </div>
            )}
            {activeStep === 6 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            What is your job title?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Dropdown
                            width={'100%'}
                            name="job_title"
                            placeholder={'Select your job title'}
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    job_title: option,
                                })
                            }
                            selectedKey={formData.job_title?.key}
                            options={[
                                {
                                    key: 'Software Engineer',
                                    value: 'Software Engineer',
                                },
                                {
                                    key: 'Chartered Accountant',
                                    value: 'Chartered Accountant',
                                },
                                { key: 'Dentist', value: 'Dentist' },
                                {
                                    key: 'Mechanical Engineer',
                                    value: 'Mechanical Engineer',
                                },
                            ]}
                        />
                    </div>
                </div>
            )}
            {activeStep === 7 && (
                <div className="pt-16">
                    <div className="mb-12">
                        <Typography
                            variant={'h4'}
                            className={'text-center font-semibold'}
                        >
                            What title are you most interested in?
                        </Typography>
                    </div>
                    <div className="pt-[75px] pb-40 flex flex-col gap-6">
                        <Dropdown
                            width={'100%'}
                            name="interested_job_title"
                            placeholder={'Select your interested title'}
                            onChange={(option) =>
                                setFormData({
                                    ...formData,
                                    interested_job_title: option,
                                })
                            }
                            selectedKey={formData.interested_job_title?.key}
                            options={[
                                {
                                    key: 'Software Engineer',
                                    value: 'Software Engineer',
                                },
                                {
                                    key: 'Chartered Accountant',
                                    value: 'Chartered Accountant',
                                },
                                { key: 'Dentist', value: 'Dentist' },
                                {
                                    key: 'Mechanical Engineer',
                                    value: 'Mechanical Engineer',
                                },
                            ]}
                        />
                    </div>
                </div>
            )}
            <Button
                className={'w-full'}
                onClick={() => {
                    if (activeStep + 1 === STEP_COUNT) {
                        onSubmit();
                        return;
                    }
                    setActiveStep(activeStep + 1);
                }}
            >
                Continue
            </Button>
        </div>
    );
};
const SignInModalForm = ({ isOpen, onClose }) => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const router = useRouter();
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {!showSignUpForm && (
                <Welcome onContinue={() => setShowSignUpForm(true)} />
            )}
            {showSignUpForm && (
                <SignUpForm
                    onSubmit={() => {
                        onClose();
                        router.push(
                            {
                                pathname: '/congratulations',
                            },
                            undefined,
                            { shallow: true }
                        );
                    }}
                />
            )}
        </Modal>
    );
};

export { SignInModalForm };
