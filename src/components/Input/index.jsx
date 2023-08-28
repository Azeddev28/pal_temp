const baseStyles =
    'border border-solid border-grey10 rounded-md outline-none font-normal p-2 text-xs';
const largeStyles = 'lg:p-3 lg:text-sm';
const Input = ({ className, ...props }) => (
    <input {...props} className={`${baseStyles} ${largeStyles} ${className}`} />
);

export * from './Checkbox';
export * from './Radio';
export * from './Text';
export { Input };
