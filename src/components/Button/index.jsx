const baseStyles =
    'tracking-wide bg-brandBlue hover:bg-hoverBlue text-white whitespace-nowrap rounded-md transition-colors duration-200 font-semibold text-xs px-6 py-2';
const largeStyles = 'lg:py-3 lg:text-sm';
const Button = ({ children, className, ...props }) => (
    <button {...props} className={`${baseStyles} ${largeStyles} ${className}`}>
        {children}
    </button>
);

export { Button };
