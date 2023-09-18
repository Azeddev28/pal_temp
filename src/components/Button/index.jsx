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

const Button = ({
    children,
    className,
    disabled,
    size,
    style,
    icon,
    ...props
}) => {
    const Icon = ICONS[icon ?? ''];

    return (
        <button
            {...props}
            style={{
                ...style,
                width: size ? getWidthBySize(size) : style?.width,
            }}
            className={`${baseStyles} ${baseLargeStyles} ${
                disabled ? disabledStyles : activeStyles
            } ${className}`}
        >
            {Icon && <Icon className="w-6 h-6" />}

            {children}
        </button>
    );
};

export { Button };
