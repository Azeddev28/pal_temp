const ChevronDown = ({ isOpen }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
                transition: 'transform 0.3s ease-in-out',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
        >
            <circle cx="8" cy="8" r="8" fill="#D2EFFF" />
            <path
                d="M5.19995 7.2002L7.79995 9.8002L10.4 7.2002"
                stroke="#005382"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ChevronDown;
