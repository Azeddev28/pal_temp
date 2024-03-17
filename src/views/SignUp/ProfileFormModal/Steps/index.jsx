import CustomDropdown from '@/components/Dropdown/dropdown';
import SearchBar from '@/components/Dropdown/suggestion';
import { Input, Radio } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { useStep } from './context';

const Svg = (p) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation"
        {...p}
    />
);
const ChevronDown = () => (
    <Svg>
        <path
            d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
            stroke="#005382"
            strokeWidth={1}
            fill="currentColor"
            fillRule="evenodd"
        />
    </Svg>
);
const Step1 = () => {
    const [showAnotherGender, setShowAnotherGender] = useState(false);
    const { register, formState, watch } = useFormContext();

    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    How do you identify?
                </Typography>
            </div>
            <div className="flex flex-col gap-6 pt-3">
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

    const { register, setValue, watch, control } = useFormContext();

    const countryOptions = useMemo(() => {
        if (!countries) return [];
        const options = countries.map((country) => ({
            key: country.name,
            value: country.code,
        }));
        setValue('country', options[234].value);
        return options;
    }, [countries]);

    const languageOptions = useMemo(() => {
        if (!languages) return [];
        const options = languages.map((language) => ({
            key: language.name,
            value: language.code,
        }));
        setValue('language', options[24].value);
        return options;
    }, [languages]);

    const handleDropDownChange = (name, value) => {
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    Pick your language and country/region
                </Typography>
            </div>

            <div className="pt-3 flex flex-col gap-6">
                {isLoadingCountries || isLoadingLanguages ? (
                    <PulseLoader className="mx-auto" color="#00446A" />
                ) : (
                    <>
                        <Controller
                            name="jobTitle"
                            control={control}
                            render={({ field }) => (
                                <CustomDropdown
                                    placeholder="Choose your language"
                                    onChange={(option) => {
                                        handleDropDownChange(
                                            'language',
                                            option.value
                                        );
                                    }}
                                    options={languageOptions}
                                    index={24}
                                    inputRef={field.ref}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="jobTitle"
                            control={control}
                            render={({ field }) => (
                                <CustomDropdown
                                    placeholder="Choose your country"
                                    onChange={(option) => {
                                        handleDropDownChange(
                                            'country',
                                            option.value
                                        );
                                    }}
                                    options={countryOptions}
                                    index={234}
                                    inputRef={field.ref}
                                    {...field}
                                />
                            )}
                        />

                        {/* <Dropdown
                            {...register('language')}
                            width={'100%'}
                            placeholder="Choose your language"
                            onChange={(option) => {
                                handleDropDownChange('language', option.value);
                            }}
                            index={17}
                            selectedKey={
                                languageOptions.find(
                                    (language) =>
                                        language.value === watch('language')
                                )?.key
                            }
                            options={languageOptions}
                        />
                        <Dropdown
                            {...register('country')}
                            width={'100%'}
                            index={234}
                            placeholder="Choose your country"
                            onChange={(option) =>
                                handleDropDownChange('country', option.value)
                            }
                            selectedKey={
                                countryOptions.find(
                                    (country) =>
                                        country.value === watch('country')
                                )?.key
                            }
                            options={countryOptions}
                        /> */}
                    </>
                )}
            </div>
        </div>
    );
};

const Step3 = () => {
    const { register, watch, formState } = useFormContext();
    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    What is your name?
                </Typography>
            </div>
            <div className="pt-3 flex flex-col gap-6">
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
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    What are you looking to do on palplug?
                </Typography>
            </div>
            <div className="pt-3 flex flex-col gap-6">
                <Radio
                    {...register('purpose')}
                    id="be-a-palplug"
                    value="Plug"
                    label="I want to be a plug"
                    tooltip={true}
                />

                <Radio
                    {...register('purpose')}
                    id="looking-for-a-palplug"
                    value="Pal"
                    label="I'm looking for a plug"
                />
            </div>
        </div>
    );
};

const Step5 = () => {
    const [companies, isLoading] = useStep('companies');
    const { register, setValue } = useFormContext();

    const companyOptions = useMemo(() => {
        if (!companies) return [];

        return companies.map((company) => ({
            label: company.name,
            value: company.uuid,
        }));
    }, [companies]);

    const handleDropDownChange = (name, value) => {
        return setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            // minWidth: 240,
            margin: 8,
            padding: '1rem',
            fontSize: '.875rem',
            borderRadius: '0.5rem',
            border: state.isFocused && '1px solid #005382',
            '&:hover': {
                borderColor: state.isFocused && '#005382',
                backgroundColor: state.isFocused ? '#fff' : '#e5e7eb',
            },
        }),
        // menu: () => ({
        //     boxShadow: 'inset 0 0px 0 rgba(0, 0, 0, 0.1)',
        //     // overflow: scroll,
        // }),
        menuList: (base) => ({
            ...base,
            maxHeight: '100px', // your desired height
        }),
        option: (provided, state) => {
            return {
                ...provided,
                fontSize: '14px',
                background: '#fff !important',
                '&:hover': {
                    // borderColor: state.isFocused && '#005382',
                    background: '#fff !important',
                },
            };
        },
        indicatorsContainer: (provided, state) => ({
            ...provided,
            backgroundColor: '#D2EFFF',
            borderRadius: '9999px',
            paddingLeft: '2px',
            paddingRight: '2px',
        }),
    };
    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    Where do you work?
                </Typography>
            </div>
            <div className="pt-3 flex flex-col gap-6">
                {isLoading ? (
                    <PulseLoader className="mx-auto" color="#00446A" />
                ) : (
                    <>
                        <SearchBar
                            options={companyOptions}
                            setValue={setValue}
                            name="company"
                            register={register}
                        />
                        {/* <Controller
                            name="company"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    components={{
                                        DropdownIndicator: ChevronDown,
                                        IndicatorSeparator: null,
                                    }}
                                    placeholder={'Select your company'}
                                    onChange={(option) => {
                                        handleDropDownChange(
                                            'company',
                                            option.value
                                        );
                                    }}
                                    styles={selectStyles}
                                    options={companyOptions}
                                    value={field.label}
                                />
                            )}
                        /> */}
                        {/* <Controller
                            name="company"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CustomDropdown
                                    placeholder={'Select your company'}
                                    onChange={(option) => {
                                        handleDropDownChange(
                                            'company',
                                            option.value
                                        );
                                    }}
                                    options={companyOptions}
                                    // index={234}
                                    inputRef={field.ref}
                                    {...field}
                                />
                            )}
                        /> */}
                    </>
                )}
            </div>
        </div>
    );
};

const Step6 = () => {
    const [industries, isLoading] = useStep('industries');
    const { register, setValue, watch, control } = useFormContext();

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

    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    What field are you interested in working in?
                </Typography>
            </div>
            <div className="pt-11 pb-16 md:pb-[135px] flex flex-col gap-6">
                {isLoading ? (
                    <PulseLoader className="mx-auto" color="#00446A" />
                ) : (
                    <>
                        <Controller
                            name="industry"
                            control={control}
                            render={({ field }) => (
                                <CustomDropdown
                                    placeholder={'Select your industry'}
                                    onChange={(option) => {
                                        handleDropDownChange(
                                            'industry',
                                            option.value
                                        );
                                    }}
                                    options={industryOptions}
                                    inputRef={field.ref}
                                    {...field}
                                />
                            )}
                        />
                        {/* <Dropdown
                            {...register('industry')}
                            width={'100%'}
                            onChange={(option) =>
                                handleDropDownChange('industry', option.value)
                            }
                            placeholder={'Select your industry'}
                            selectedKey={
                                industryOptions.find(
                                    (industry) =>
                                        industry.value === watch('industry')
                                )?.key
                            }
                            options={industryOptions}
                        /> */}
                    </>
                )}
            </div>
        </div>
    );
};

const Step7 = () => {
    const { register, setValue, watch, control } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    const jobs = [
        { key: 'Accountant', value: 'Accountant' },
        { key: 'Biomedical Engineer', value: 'Biomedical Engineer' },
        { key: 'Business Analyst', value: 'Business Analyst' },
        { key: 'Business Developer', value: 'Business Developer' },
        { key: 'Civil Engineer', value: 'Civil Engineer' },
        { key: 'Copy Writer', value: 'Copy Writer' },
        { key: 'Data Scientist', value: 'Data Scientist' },
        { key: 'Hardware Engineer', value: 'Hardware Engineer' },
        { key: 'Human Resources', value: 'Human Resources' },
        { key: 'Marketing', value: 'Marketing' },
        { key: 'Marketing Associate', value: 'Marketing Associate' },
        { key: 'Marketing Manager', value: 'Marketing Manager' },
        { key: 'Networking Engineer', value: 'Networking Engineer' },
        { key: 'Operations', value: 'Operations' },
        { key: 'Product Designer', value: 'Product Designer' },
        { key: 'Product Manager', value: 'Product Manager' },
        { key: 'QA Engineer', value: 'QA Engineer' },
        { key: 'Recruiter', value: 'Recruiter' },
        { key: 'Sales', value: 'Sales' },
        { key: 'Software Engineer', value: 'Software Engineer' },
        { key: 'Technical Recruiter', value: 'Technical Recruiter' },
        { key: 'UX/UI Designer', value: 'UX/UI Designer' },
    ];
    return (
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    What is your job title?
                </Typography>
            </div>
            <div className="pt-3 flex flex-col gap-6">
                <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => (
                        <CustomDropdown
                            placeholder={'Select your job title'}
                            onChange={(option) => {
                                handleDropDownChange('jobTitle', option.value);
                            }}
                            options={jobs}
                            inputRef={field.ref}
                            {...field}
                        />
                    )}
                />
                {/* <Dropdown
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
                /> */}
            </div>
        </div>
    );
};

const Step8 = () => {
    const { register, setValue, watch, control } = useFormContext();

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
        <div className="pt-10">
            <div className="mb-12">
                <Typography
                    variant={'h4'}
                    className={'text-center font-semibold'}
                >
                    What role are you most interested in?
                </Typography>
            </div>
            <div className="pt-2 flex flex-col gap-6">
                <Controller
                    name="interestedJobTitle"
                    control={control}
                    render={({ field }) => (
                        <CustomDropdown
                            placeholder={'Select your interested title'}
                            onChange={(option) => {
                                handleDropDownChange(
                                    'interestedJobTitle',
                                    option.value
                                );
                            }}
                            options={jobs}
                            inputRef={field.ref}
                            {...field}
                        />
                    )}
                />
                {/* <Dropdown
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
                /> */}
            </div>
        </div>
    );
};

export { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 };
