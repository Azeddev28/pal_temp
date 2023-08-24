import Icons from '@/Icons';

const IconWidget = ({ icon }) => {
    const Icon = Icons[icon];
    if (!Icon) return null;
    return (
        <div className="rounded-3xl w-20 h-20 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] lg:rounded-[2.2rem]">
            <Icon className="w-12 h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]" />
        </div>
    );
};

export { IconWidget };
