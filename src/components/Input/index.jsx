const Input = ({ className, ...props }) => (
    <input
        {...props}
        className={`border border-solid border-grey10 rounded-lg p-3 outline-none text-lg font-normal ${className}`}
    />
);

export { Input };
