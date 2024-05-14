import { useFormContext } from 'react-hook-form';
import { Typography } from "@/components/Typography";
import { Input } from '@/components/Input';


export const NameSelector = () => {
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