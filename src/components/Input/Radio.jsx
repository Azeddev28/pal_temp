const Radio = (props) => (
    <label
        className="relative flex items-center cursor-pointer p-3 rounded-full overflow-hidden"
        for=":R184qcm:"
    >
        <input
            name="type"
            type="radio"
            className="relative appearance-none w-5 h-5 border rounded-full border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:opacity-0 hover:before:opacity-10 before:transition-opacity text-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
            id=":R184qcm:"
        />
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-gray-900">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
            >
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
        </span>
    </label>
);

export { Radio };
