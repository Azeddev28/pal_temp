import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Image from 'next/image';
import desktopImage from '../../../public/images/desktop.png';
import { CompanyIconWidgetList } from './CompanyIconWidgetList';

const Landing = () => {
    return (
        <div>
            <div className="py-8 md:pt-24 md:pb-12 lg:pt-40 lg:pb-16">
                <div className="flex flex-col md:flex-row md:gap-10 lg:gap-16 xl:justify-between">
                    <div className="order-1 md:order-2 md:w-1/2">
                        <div className="flex justify-end items-center h-full">
                            <Image src={desktopImage} />
                        </div>
                    </div>
                    <div className="order-2 md:order-1 md:w-1/2">
                        <div className="h-full flex flex-col items-center justify-center p-5 gap-10 lg:gap-16 xl:pl-24">
                            <div className="flex flex-col text-center gap-10">
                                <h1 className="text-3xl lg:text-[42px] mb-4 text-brandBlue dark:text-brandBlue font-bold">
                                    Looking for a referral or want to get paid
                                    to refer others?
                                </h1>
                                <h4 className="text-base lg:text-xl leading-5 text-grey20 font-semibold">
                                    Whether you want to get job of your dreams
                                    or want to get paid to help someone get
                                    there, PalPlug is the platform to help you
                                    connect. Get early access below.
                                </h4>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-xs lg:text-sm  text-black font-semibold">
                                    Join Blake, Kareem and 2165 others on the
                                    waitlist
                                </p>
                                <div className="flex gap-2 flex-col md:flex-row md:justify-start">
                                    <Input
                                        className={'w-full'}
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                    <Button className={'w-full md:w-fit'}>
                                        Join waitlist
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 px-5 pb-5 lg:gap-10 lg:px-10 lg:pb-10 xl:px-24">
                <p className="text-xs font-semibold text-grey20 lg:text-sm">
                    Get referrals to top companies like
                </p>
                <CompanyIconWidgetList />
            </div>
        </div>
    );
};

export { Landing };
