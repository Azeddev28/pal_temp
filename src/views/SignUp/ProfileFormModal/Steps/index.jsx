import { getRequest } from '@/axios';
import CustomDropdown from '@/components/Dropdown/dropdown';
import SearchBar from '@/components/Dropdown/suggestion';
import { Input, Radio } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { getRoute } from '@/server';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { useStep } from './context';

const fetchUserRoles = async (setState) => {
    await getRequest(getRoute('userRoles'))
        .then((res) => {
            setState(
                res.map((role) => {
                    return { key: role.title, value: role.uuid };
                })
            );
        })
        .catch((err) => {});
};

const GenderSelector = () => {
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
                <div className="flex gap-2 items-baseline">
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

const CountrySelector = () => {
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
                    </>
                )}
            </div>
        </div>
    );
};

const NameSelector = () => {
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

const RoleSelector = () => {
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

const CompanySelector = () => {
    const [companies, isLoading] = useStep('companies');
    const {
        register,
        setValue,
        control,
        watch,
        handleSubmit,
        formState,
        getValues,
    } = useFormContext();

    const companyOptions = useMemo(() => {
        if (!companies) return [];

        return companies.map((company) => ({
            label: company.name,
            value: company.uuid,
        }));
    }, [companies]);

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
                        <Controller
                            name="company"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <SearchBar
                                    formState={formState}
                                    options={companyOptions}
                                    handleChange={onChange}
                                    setValue={setValue}
                                    value={value}
                                />
                            )}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const InterestedIndustrySelector = () => {
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
                    </>
                )}
            </div>
        </div>
    );
};

const JobSelector = () => {
    const [userRoles, setUserRoles] = useState([]);
    const { register, setValue, watch, control } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    useEffect(() => {
        fetchUserRoles(setUserRoles);
    }, []);
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
                            options={userRoles}
                            inputRef={field.ref}
                            {...field}
                        />
                    )}
                />
            </div>
        </div>
    );
};

const InterestedJobSelector = () => {
    const [userRoles, setUserRoles] = useState([]);
    const { register, setValue, watch, control } = useFormContext();

    const handleDropDownChange = (name, value) =>
        setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
        });

    useEffect(() => {
        fetchUserRoles(setUserRoles);
    }, []);
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
                            options={userRoles}
                            inputRef={field.ref}
                            {...field}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export {
    CompanySelector,
    CountrySelector,
    GenderSelector,
    InterestedIndustrySelector,
    InterestedJobSelector,
    JobSelector,
    NameSelector,
    RoleSelector,
};
