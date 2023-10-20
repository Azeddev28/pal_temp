import Image from 'next/image';

const LogoWidget = ({ logoInfo }) => (
    <div className="rounded-3xl w-20 h-20 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center xl:w-[100px] xl:h-[100px] xl:rounded-[2.2rem]">
        <Image
            src={logoInfo.src}
            style={{
                width: logoInfo.width,
                height: logoInfo.height,
            }}
            alt="..."
        />
    </div>
);

export { LogoWidget };
