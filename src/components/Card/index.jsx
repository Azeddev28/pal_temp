import Image from 'next/image';

const Card = ({ text1, text2, icon, borderColor, backgroundColor }) => {
    return (
        <div className="flex flex-row gap-2 p-5 bg-white border-[1px] border-solid rounded-lg  h-full">
            <div className="flex justify-center items-center h-[26px] w-[26px] bg-brandSecondaryBlue">
                {!icon && (
                    <p className="subHeading4 text-bluishCyan rounded-lg">1</p>
                )}
                {icon && <Image src={icon} alt="icon" />}
            </div>
            <div className="flex flex-col gap-2">
                <p className="subHeading3">{text1}</p>
                <p className="subHeading6">{text2}</p>
            </div>
        </div>
    );
};

export default Card;
