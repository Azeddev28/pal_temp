import { Dropdown } from '@/components/Dropdown';
import { Input, Radio } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useStep } from './context';

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
    const [countries, isLoadingCountries] = useStep('countries');
    const [languages, isLoadingLanguages] = useStep('languages');

    const { register, setValue, watch } = useFormContext();

    const countryOptions = useMemo(() => {
        if (!countries) return [];
        return countries.map((country) => ({
            key: country.name,
            value: country.code,
        }));
    }, [countries]);

    const languageOptions = useMemo(() => {
        if (!languages) return [];
        return languages.map((language) => ({
            key: language.name,
            value: language.code,
        }));
    }, [languages]);

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    if (isLoadingCountries || isLoadingLanguages) return null;
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
                        handleDropDownChange('language', option.value);
                    }}
                    selectedKey={
                        languageOptions.find(
                            (language) => language.value === watch('language')
                        )?.key
                    }
                    options={languageOptions}
                />
                <Dropdown
                    {...register('country')}
                    width={'100%'}
                    placeholder="Choose your country"
                    onChange={(option) =>
                        handleDropDownChange('country', option.value)
                    }
                    selectedKey={
                        countryOptions.find(
                            (country) => country.value === watch('country')
                        )?.key
                    }
                    options={countryOptions}
                />
            </div>
        </div>
    );
};

const Step3 = () => {
    const { register, watch, formState, setValue } = useFormContext();
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
    const [companies, isLoading] = useStep('companies');
    const { register, setValue, watch } = useFormContext();

    const companyOptions = useMemo(() => {
        if (!companies) return [];
        return companies.map((company) => ({
            key: company.name,
            value: company.uuid,
        }));
    }, [companies]);

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    if (isLoading) return null;
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
                        companyOptions.find(
                            (company) => company.value === watch('company')
                        )?.key
                    }
                    options={companyOptions}
                />
            </div>
        </div>
    );
};

const Step6 = () => {
    const [industries, isLoading] = useStep('industries');
    const { register, setValue, watch } = useFormContext();

    const industryOptions = useMemo(() => {
        if (!industries) return [];
        return industries.map((industry) => ({
            key: industry.name,
            value: industry.uuid,
        }));
    }, [industries]);

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    if (isLoading) return null;
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
                        industryOptions.find(
                            (industry) => industry.value === watch('industry')
                        )?.key
                    }
                    options={industryOptions}
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
