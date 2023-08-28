import { CheckCircleFilledIcon, WarningIcon } from '@/Icons';
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
        <div className="flex flex-row gap-2">
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

const Text = ({
    placeholder,
    label,
    id,
    helperText,
    message,
    status,
    disabled,
    display,
    ...rest
}) => {
    const baseClasses =
        ' hover:bg-[#F5F8FF] active:border-[#8bb4ff] active:bg-[#F5F8FF] focus:border-brandBlue focus:bg-white hover:bg-[#F5F8FF]';
    let inputClasses = '';
    if (disabled) {
        inputClasses = 'border-theme-border';
    } else if (display) {
        inputClasses = 'border-theme-border bg-theme-border';
    } else if (status) {
        inputClasses = `${STATUS_INPUT_BORDER[status]} ${baseClasses}`;
    } else {
        inputClasses = `border-theme-border ${baseClasses}`;
    }
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="flex flex-col gap-2">
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
                    disabled={disabled || display}
                    id={id}
                    placeholder={placeholder}
                    type="text"
                    className={`p-3 bg-white border-2 border-solid rounded-lg outline-none ${inputClasses}`}
                />
            </label>
            {renderHelperTextPerStatus(
                !disabled && !display ? status : undefined,
                helperText
            )}
        </div>
    );
};

export { Text };
