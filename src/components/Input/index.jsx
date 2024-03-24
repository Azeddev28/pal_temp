import { CheckCircleFilledIcon, WarningIcon } from '@/Icons';
import { forwardRef } from 'react';
import { Typography } from '../Typography';

const STATUS_INPUT_BORDER = {
    error: 'border-error',
    success: 'border-success',
    warning: 'border-warning',
};

const STATUS_TEXT_COlOR = {
    error: 'text-error',
    success: 'text-success',
    warning: 'text-warning',
};

const STATUS_ICON = {
    error: WarningIcon,
    success: CheckCircleFilledIcon,
    warning: WarningIcon,
};

const HelperText = ({ text, colorClass, renderIcon }) => {
    const icon = renderIcon?.();
    return (
        <div className="flex flex-row gap-2 items-center">
            {icon}
            <Typography
                variant={'x-small'}
                className={`${colorClass} pointer-events-none`}
            >
                {text}
            </Typography>
        </div>
    );
};

const renderHelperTextPerStatus = (status, text) => {
    if (!text) return null;
    if (!status) return <HelperText text={text} colorClass={'text-grey20'} />;
    const Icon = STATUS_ICON[status];
    return (
        <HelperText
            text={text}
            colorClass={STATUS_TEXT_COlOR[status]}
            renderIcon={() => (
                <Icon className={`w-5 h-5 ${STATUS_TEXT_COlOR[status]}`} />
            )}
        />
    );
};

const Input = forwardRef(
    (
        {
            placeholder,
            label,
            id,
            helperText,
            message,
            status,
            disabled,
            display,
            width,
            ...rest
        },
        ref
    ) => {
        const baseClasses = `w-full p-3 bg-white border-2 border-solid rounded-lg outline-none ${
            !!status ? STATUS_INPUT_BORDER[status] : ''
        } ${!!display ? 'bg-theme-border' : ''}`;
        const hoverClasses = 'hover:bg-[#F5F8FF]';
        const activeClasses = `${
            !!status
                ? `active:${STATUS_INPUT_BORDER[status]}`
                : 'active:border-[#8bb4ff]'
        } active:bg-[#F5F8FF]`;
        const focusClasses = `${
            !!status
                ? `focus:${STATUS_INPUT_BORDER[status]}`
                : 'focus:border-brandBlue'
        } focus:bg-white`;

        return (
            <div style={{ width }} className="flex flex-col gap-2">
                <label htmlFor={id} className="w-full flex flex-col gap-2">
                    {label && (
                        <Typography
                            variant={'body'}
                            as={'span'}
                            className={`font-semibold ${
                                disabled ? 'text-grey20' : ''
                            }`}
                        >
                            {label}
                        </Typography>
                    )}
                    <input
                        {...rest}
                        ref={ref}
                        disabled={disabled || display}
                        id={id}
                        placeholder={placeholder}
                        className={`h-12 ${baseClasses} ${hoverClasses} ${activeClasses} ${focusClasses} ${
                            !!disabled || display ? 'pointer-events-none' : ''
                        }`}
                    />
                </label>
                {renderHelperTextPerStatus(
                    !disabled && !display ? status : undefined,
                    helperText
                )}
            </div>
        );
    }
);

export { Input };

export * from './Checkbox';
export * from './Radio';
