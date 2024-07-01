import { Controller, useFormContext } from 'react-hook-form';
import { useStep } from './context';
import { Typography } from '@/components/Typography';
import { useMemo } from 'react';
import CustomDropdown from '@/components/Dropdown/dropdown';

export const InterestedIndustrySelector = () => {
    const industries = useStep('industries');
    const isLoading = false;
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
                                    watch={watch}
                                    name="industry"
                                    placeholder={'Select your industry'}
                                    onSelect={(option) => {
                                        field.onChange(option);

                                        handleDropDownChange(
                                            'industry',
                                            option
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
