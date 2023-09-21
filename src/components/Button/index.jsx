import * as ICONS from '@/Icons';

const baseStyles =
    'flex gap-4 h-fit items-center tracking-wide transition-colors duration-200 text-white whitespace-nowrap rounded-md font-semibold text-xs px-6 py-2';
const activeStyles = 'bg-brandBlue hover:bg-hoverBlue active:bg-pressedBlue';
const disabledStyles = 'bg-disabledBlue cursor-none pointer-events-none';
const baseLargeStyles = 'lg:py-3 lg:text-sm';

const getWidthBySize = (size) => {
    switch (size) {
        case 'sm':
            return '288px';
        case 'md':
            return '343px';
        case 'lg':
            return '382px';
    }
};

const getTextJustifyClass = (textPosition) => {
    switch (textPosition) {
        case 'left':
            return 'justify-start';
        case 'right':
            return 'justify-end';
        case 'center':
            return 'justify-center';
    }
};

const Button = ({
    children,
    className = '',
    disabled = false,
    textPosition = 'center', // "left"  | "right" | "center"
    size = '', // "sm" | "md" | "lg"
    style = {},
    icon,
    ...restProps
}) => {
    const Icon = ICONS[icon] || null;

    // Calculate button width based on size
    const buttonStyle = {
        ...style,
        width: size ? getWidthBySize(size) : style.width,
    };

    // Define classes based on conditions
    const buttonClasses = `${baseStyles} ${baseLargeStyles} ${
        disabled ? disabledStyles : activeStyles
    } ${className}`;

    const textJustifyClass = getTextJustifyClass(textPosition);
    return (
        <button {...restProps} style={buttonStyle} className={buttonClasses}>
            {Icon && <Icon className="w-6 h-6" />}
            <span className={`flex w-full ${textJustifyClass}`}>
                {children}
            </span>
        </button>
    );
};
export { Button };
