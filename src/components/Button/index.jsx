const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-brandBlue hover:bg-hoverBlue text-white text-base px-4 py-2 whitespace-nowrap rounded-lg transition-colors duration-200 font-semibold"
  >
    {children}
  </button>
);

export { Button };
