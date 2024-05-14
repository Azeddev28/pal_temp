import { Radio } from "@/components/Input";
import { Typography } from "@/components/Typography";
import { useFormContext } from "react-hook-form";


export const RoleSelector = () => {
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
