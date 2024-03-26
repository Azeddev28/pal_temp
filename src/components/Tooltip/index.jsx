const Tooltip = ({ text, tooltip }) => {
    return (
        <div className="has-tooltip">
            <p className="text-sm font-normal text-grey20 underline">{text}</p>
            <p className="tooltip text-xs rounded-lg shadow-lg p-2 bg-gray-100 text-grey20 border-gray-800 -mt-24 -ml-32 w-64 h-16">
                {tooltip}
            </p>
        </div>
    );
};

export default Tooltip;
