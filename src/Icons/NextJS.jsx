const NextJS = ({ width, height, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
    <path d="M15 12v-3" />
  </svg>
);

export default NextJS;
