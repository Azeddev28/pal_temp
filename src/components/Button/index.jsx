const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`bg-brandBlue hover:bg-hoverBlue text-white text-base px-6 py-2 whitespace-nowrap rounded-md transition-colors duration-200 font-semibold ${className}`}
  >
    {children}
  </button>
);

export { Button };
