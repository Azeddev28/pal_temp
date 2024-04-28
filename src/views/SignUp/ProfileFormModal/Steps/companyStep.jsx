import { Controller, useFormContext } from "react-hook-form";
import { useStep } from "./context";
import { Typography } from "@/components/Typography";
import { PulseLoader } from "react-spinners";
import SearchBar from "@/components/Dropdown/suggestion";
import { useMemo } from "react";

export const CompanySelector = () => {
    const isLoading = false;
    const companies = useStep('companies');
    const { setValue, control, formState } = useFormContext();

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
                            render={({ field: { onChange, value } }) => (
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