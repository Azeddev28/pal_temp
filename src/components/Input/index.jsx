const Input = ({ style, ...props }) => (
  <input
    {...props}
    style={{ ...style, width: style?.width ?? '100%' }}
    className="border border-solid border-grey10 rounded-lg p-3 outline-none text-lg font-normal"
  />
);

export { Input };
