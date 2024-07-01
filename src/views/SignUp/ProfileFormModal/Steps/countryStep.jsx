import { Controller, useFormContext } from 'react-hook-form';
import { useStep } from './context';
import { useEffect, useMemo } from 'react';
import { Typography } from '@/components/Typography';
import { PulseLoader } from 'react-spinners';
import CustomDropdown from '@/components/Dropdown/dropdown';

export const CountrySelector = () => {
    // TODO: This is now changed to axios and have to send isLoading state from there
    const isLoadingCountries = false;
    const isLoadingLanguages = false;
    const countries = useStep('countries');
    const languages = useStep('languages');

    const { setValue, control, watch } = useFormContext();

    const countryOptions = useMemo(() => {
        if (!countries) return [];
        const options = countries?.map((country) => ({
            key: country?.name,
            value: country?.code,
        }));
        !watch('country') && setValue('country', options[234]);
        return options;
    }, [countries]);

    const languageOptions = useMemo(() => {
        if (!languages) return [];
        const options = languages?.map((language) => ({
            key: language?.name,
            value: language?.code,
        }));
        !watch('language') && setValue('language', options[24]);
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
                            name="language"
                            control={control}
                            render={({ field }) => (
                                <CustomDropdown
                                    name="language"
                                    placeholder="Choose your language"
                                    watch={watch}
                                    onSelect={(option) => {
                                        field.onChange(option);
                                        handleDropDownChange(
                                            'language',
                                            option
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
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <CustomDropdown
                                    name="country"
                                    watch={watch}
                                    placeholder="Choose your country"
                                    onSelect={(option) => {
                                        field.onChange(option);
                                        handleDropDownChange('country', option);
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
