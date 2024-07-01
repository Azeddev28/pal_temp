import { Typography } from '@/components/Typography';
import { Controller, useFormContext } from 'react-hook-form';
import CustomDropdown from '@/components/Dropdown/dropdown';
import { useStep } from './context';

export const JobSelector = () => {
    const userRoles = useStep('userRoles').map((role) => ({
        key: role.title,
        value: role.uuid,
    }));

    const { setValue, control, watch } = useFormContext();

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
                    What is your job title?
                </Typography>
            </div>
            <div className="pt-3 flex flex-col gap-6">
                <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => (
                        <CustomDropdown
                            watch={watch}
                            name="jobTitle"
                            placeholder={'Select your job title'}
                            onSelect={(option) => {
                                field.onChange(option);
                                handleDropDownChange('jobTitle', option);
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
