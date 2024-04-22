const Tooltip = ({ text, tooltip }) => {
    return (
        <div className="has-tooltip">
            <p className="cursor-pointer pl-[10px] text-sm font-normal text-grey20 underline">
                {text}
            </p>
            <p className=" tooltip w-full left-[125px] text-[9px] screen_360:text-xs rounded-lg shadow-lg p-2 bg-gray-100 text-grey20 border-gray-800 -mt-24 -ml-32  h-16">
                {tooltip}
            </p>
        </div>
    );
};

export default Tooltip;
