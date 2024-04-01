import Image from 'next/image';

const Card = ({ text1, text2, icon, borderColor, backgroundColor, id }) => {
    return (
        <div className="flex flex-row gap-2 p-5 bg-white border-[1px] border-solid rounded-lg  h-full">
            <div className="flex justify-center rounded-lg items-center !h-[34px] !min-h-[34px] min-w-[34px] bg-brandSecondaryBlue">
                {!icon && (
                    <p className="subHeading4 text-bluishCyan rounded-lg">
                        {id}
                    </p>
                )}
                {icon && <Image src={icon} alt="icon" />}
            </div>
            <div className="flex flex-col gap-2">
                <p className="subHeading3 text-trueBlack">{text1}</p>
                <p className="subHeading6">{text2}</p>
            </div>
        </div>
    );
};

export default Card;
