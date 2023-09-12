import { Dropdown } from '@/components/Dropdown';
import { Input, Radio } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = () => {
    const [showAnotherGender, setShowAnotherGender] = useState(false);
    const { register, formState, watch } = useFormContext();

    return (
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
                    {...register('gender')}
                    id="male"
                    value="male"
                    label="Male"
                    onClick={() => setShowAnotherGender(false)}
                />
                <Radio
                    {...register('gender')}
                    id="female"
                    value="female"
                    label="Female"
                    onClick={() => setShowAnotherGender(false)}
                />
                <div className="flex gap-2">
                    <Radio
                        {...register('gender')}
                        id="another"
                        value="another"
                        label={
                            !showAnotherGender ? 'Specify Another' : undefined
                        }
                        onClick={() => setShowAnotherGender(true)}
                    />

                    {showAnotherGender && (
                        <div className="w-full">
                            <Input
                                {...register('anotherGender')}
                                type="text"
                                value={watch('anotherGender')}
                                status={
                                    !!formState.errors['anotherGender']?.message
                                        ? 'error'
                                        : undefined
                                }
                                helperText={
                                    formState.errors.anotherGender?.message
                                }
                                placeholder={'Enter your gender...'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Step2 = () => {
    const { register, setValue, watch } = useFormContext();
    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    const countries = [
        { key: 'United States', value: 'United States' },
        { key: 'Japan', value: 'Japan' },
    ];
    const languages = [
        { key: 'English(US)', value: 'English(US)' },
        { key: 'Japanese', value: 'Japanese' },
    ];
    console.log({ language: watch('language'), country: watch('country') });
    return (
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
                    {...register('language')}
                    width={'100%'}
                    placeholder="Choose your language"
                    onChange={(option) => {
                        console.log({ option });
                        handleDropDownChange('language', option.value);
                    }}
                    selectedKey={
                        languages.find(
                            (language) => language.value === watch('language')
                        )?.key
                    }
                    options={languages}
                />
                <Dropdown
                    {...register('country')}
                    width={'100%'}
                    placeholder="Choose your country"
                    onChange={(option) =>
                        handleDropDownChange('country', option.value)
                    }
                    selectedKey={
                        countries.find(
                            (country) => country.value === watch('country')
                        )?.key
                    }
                    options={countries}
                />
            </div>
        </div>
    );
};

const Step3 = () => {
    const { register, watch, formState } = useFormContext();

    console.log({ firstName: watch('firstName'), lastName: watch('lastName') });
    return (
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
                <Input
                    type="text"
                    {...register('firstName')}
                    id="first-name"
                    value={watch('firstName')}
                    placeholder={'Jhon'}
                    label={'First name'}
                    status={
                        !!formState.errors.firstName?.message
                            ? 'error'
                            : undefined
                    }
                    helperText={formState.errors.firstName?.message}
                />
                <Input
                    type="text"
                    {...register('lastName')}
                    id="last-name"
                    value={watch('lastName')}
                    placeholder={'Doe'}
                    label={'Last name'}
                    status={
                        !!formState.errors.lastName?.message
                            ? 'error'
                            : undefined
                    }
                    helperText={formState.errors.lastName?.message}
                />
            </div>
        </div>
    );
};

const Step4 = () => {
    const { register } = useFormContext();
    return (
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
                    {...register('purpose')}
                    id="be-a-palplug"
                    value="I want to be a plug"
                    label="I want to be a plug"
                />

                <Radio
                    {...register('purpose')}
                    id="looking-for-a-palplug"
                    value="I'm looking for a plug"
                    label="I'm looking for a plug"
                />
            </div>
        </div>
    );
};

const Step5 = () => {
    const { register, setValue, watch } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    const companies = [
        { key: 'Google', value: 'google' },
        { key: 'Meta', value: 'meta' },
        { key: 'Amazon', value: 'amazon' },
        { key: 'Netflix', value: 'netflix' },
    ];
    return (
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
                    {...register('company')}
                    width={'100%'}
                    onChange={(option) =>
                        handleDropDownChange('company', option.value)
                    }
                    placeholder={'Select your company'}
                    selectedKey={
                        companies.find(
                            (company) => company.value === watch('company')
                        )?.key
                    }
                    options={companies}
                />
            </div>
        </div>
    );
};

const Step6 = () => {
    const { register, setValue, watch } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    const industries = [
        { key: 'Tech', value: 'tech' },
        { key: 'Commerce', value: 'commerce' },
        { key: 'Medicine', value: 'medicine' },
        {
            key: 'Engineering',
            value: 'engineering',
        },
    ];

    return (
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
                    {...register('industry')}
                    width={'100%'}
                    onChange={(option) =>
                        handleDropDownChange('industry', option.value)
                    }
                    placeholder={'Select your industry'}
                    selectedKey={
                        industries.find(
                            (industry) => industry.value === watch('industry')
                        )?.key
                    }
                    options={industries}
                />
            </div>
        </div>
    );
};

const Step7 = () => {
    const { register, setValue, watch } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    const jobs = [
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
    ];
    return (
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
                    {...register('jobTitle')}
                    width={'100%'}
                    onChange={(option) =>
                        handleDropDownChange('jobTitle', option.value)
                    }
                    placeholder={'Select your job title'}
                    selectedKey={
                        jobs.find((job) => job.value === watch('jobTitle'))?.key
                    }
                    options={jobs}
                />
            </div>
        </div>
    );
};

const Step8 = () => {
    const { register, setValue, watch } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    const jobs = [
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
    ];
    return (
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
                    {...register('interestedJobTitle')}
                    width={'100%'}
                    onChange={(option) =>
                        handleDropDownChange('interestedJobTitle', option.value)
                    }
                    placeholder={'Select your interested title'}
                    selectedKey={
                        jobs.find(
                            (job) => job.value === watch('interestedJobTitle')
                        )?.key
                    }
                    options={jobs}
                />
            </div>
        </div>
    );
};

export { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 };
