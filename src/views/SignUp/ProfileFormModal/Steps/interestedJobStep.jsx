import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "@/components/Typography";
import CustomDropdown from '@/components/Dropdown/dropdown';
import { useStep } from "./context";


export const InterestedJobSelector = () => {
    const userRoles = useStep('userRoles').map(role => ({
        key: role.title,
        value: role.uuid
    }));
    const { register, setValue, watch, control } = useFormContext();

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