import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import Card from '@/components/Card';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Input } from '@/components/Input';
import WorkDemonstration from '@/components/WorkDemonstration';
import theme from '@/components/theme';
import { getRoute } from '@/api';
import {
    FOR_REFERRER,
    For_Job_Seekers,
    PalPlug_Services,
    Social_Icons,
} from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import DownArrow from '../../../public/images/DownArrow.svg';
import LandingPageRobos from '../../../public/images/LandingPageRobos.svg';
import LandingPageSingleRobo from '../../../public/images/LandingPageSingleRobo.svg';
import {
    setAuthState,
    setHasJoinedWaitlist,
    setIsUserRegistered,
    setScrollStateContact,
    setScrollStateWorking,
    setUserRegistrationInfo,
} from '../../store/slices/authSlice';
import { wrapper } from '../../store/store';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial state from here

            await store.dispatch(setAuthState(false));
            return {
                props: {
                    authState: false,
                },
            };
        }
);

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email')
        .matches(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter valid email'
        ),
});

const Landing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const workingBehaviour = useRef();
    const contact = useRef();
    const { scrollContact, scrollWorking } = useSelector((state) => state.auth);

    useEffect(() => {
        if (workingBehaviour.current) {
            const scrollOptions = {
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            };
            workingBehaviour.current.scrollIntoView(scrollOptions);
        }
        dispatch(setScrollStateWorking(false));
    }, [scrollWorking]);
    useEffect(() => {
        if (contact.current) {
            contact.current.scrollIntoView({ behavior: 'smooth' });
        }
        dispatch(setScrollStateContact(false));
    }, [scrollContact]);

    // for displaying the button show more
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMore(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, formState, handleSubmit, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(emailSchema),
    });
    const updateWaitListStatusAndRedirect = () => {
        dispatch(setHasJoinedWaitlist());
        router.push('/signup', undefined, {
            shallow: true,
        });
    };

    const onSubmit = ({ email }) => {
        postRequest(getRoute('joinWaitlist'), { email })
            .then((res) => {
                updateWaitListStatusAndRedirect();
            })
            .catch(
                ({
                    response: {
                        data: { code: code },
                    },
                }) => {
                    if (code === 'WAITLIST_JOINED') {
                        updateWaitListStatusAndRedirect();
                    }
                    else if (code === 'USER_ALREADY_REGISTERED') {
                        // TODO: Need to set certain info.
                        dispatch(setUserRegistrationInfo({
                            email: email,
                            isUserRegistered: true
                        }));
                        updateWaitListStatusAndRedirect();
                    }
                    else if (code === 'PROFILE_ALREADY_REGISTERED') {
                        router.push('/congratulations', undefined, {
                            shallow: true,
                        });
                    }
                }
            );
    };

    return (
        <div className="pt-[68px]">
            <div className="bg-white">
                <div className="relative flex overflow-x-hidden">
                    <div className="md:py-5 py-2 animate-marquee whitespace-nowrap flex flex-row gap-5">
                        {Social_Icons.map((item, index) => (
                            <span
                                key={index}
                                className="h-[90px] w-[90px] flex items-center justify-center"
                            >
                                <Image
                                    src={item}
                                    alt="social-icons"
                                    className="inline"
                                />
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 md:py-5 py-2 animate-marquee2 whitespace-nowrap flex flex-row gap-5">
                        {Social_Icons.map((item, index) => (
                            <span
                                key={index}
                                className="h-[90px] w-[90px] flex items-center justify-center"
                            >
                                <Image
                                    src={item}
                                    alt="social-icons"
                                    className="inline"
                                />
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex md:pt-5 md:pr-6 md:pb-4 lg:pl-14  flex-col pt-0 pr-6 pb-4 pl-6">
                    <div className="flex md:gap-16 lg:flex-row gap-8 lg:p-2 flex-col-reverse w-full">
                        <div className="flex  lg:max-w-[46.5%] md:gap-[74px] gap-6 flex-col w-full justify-between">
                            <div className="flex md:gap-10 gap-4 flex-col">
                                <p className="heading">
                                    Looking for a referral or want to get paid
                                    to refer others?
                                </p>
                                <p className="subHeading2 text-grey20">
                                    Whether you need help getting your foot in
                                    the door at your favorite company or want to
                                    get paid to help someone else get there,
                                    palplug is the platform to help you connect.
                                    Get early access below.
                                </p>
                            </div>
                            <div className="flex md:flex-row flex-col gap-4">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex gap-2 flex-col md:flex-row md:justify-start  w-full"
                                >
                                    <Input
                                        {...register('email')}
                                        value={watch('email')}
                                        width={'100%'}
                                        type="text"
                                        placeholder="Enter your email"
                                        status={
                                            !!formState.errors.email
                                                ? 'error'
                                                : undefined
                                        }
                                        helperText={
                                            formState.errors.email?.message
                                        }
                                    />
                                    <Button
                                        className={`!min-h-12 w-full md:w-fit !h-12   ${!formState
                                            .errors.email}`}
                                        type="submit"
                                    >
                                        Join waitlist
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:max-w-[53%] w-full">
                            <Image src={LandingPageRobos} />
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-wrap flex-col lg:gap-[12px] gap-[12px] xl:gap-[60px]  max-w-[100%] lg:max-w-[85%]  px-6  lg:px-0 m-auto md:pb-10 pb-5 box-content">
                    {PalPlug_Services.map((item, index) => (
                        <div
                            className="flex xl:flex-1 md:w-[100%] lg:w-[49%] xl:w-[29.6%]  h-[122px] sm:h-[100px] lg:h-[99px] xl:h-auto"
                            key={index}
                        >
                            <Card
                                text1={item?.text1}
                                text2={item?.text2}
                                borderColor={theme.palette.grey.grey10V2}
                                backgroundColor={theme.palette.white.trueWhite}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
                {isVisible && (
                    <div className="animate-fade flex m-auto py-2 px-3 rounded-[27px] gap-2.5 w-[184px] shadow-custom mb-6 cursor-pointer">
                        <p className="subHeading3 text-trueBlack">
                            Scroll to learn more
                        </p>

                        <div className="flex justify-center items-center bg-brandSecondaryBlue h-4 w-4 rounded-full">
                            <div className="animated-div">
                                <Image src={DownArrow} height={18} width={18} />
                            </div>
                        </div>
                    </div>
                )}
                {!showMore && <div className="h-6 w-full"></div>}
                {showMore && (
                    <>
                        <div
                            ref={workingBehaviour}
                            className="grid grid-cols-10 bg-whiteSmoke md:pt-20 md:pr-8 md:pb-20 md:pl-16 pt-8 pr-5 pb-10 pl-5"
                        >
                            <div className="md:col-span-9 col-span-10 flex  md:flex-col flex-col gap-10  ">
                                <div className="flex flex-col md:flex-col gap-4 mb-2">
                                    <p className="heading">How it Works: </p>
                                    <p className="subHeading3 text-neutral-black">
                                        For Job Seeker
                                    </p>
                                    <WorkDemonstration list={For_Job_Seekers} />
                                </div>
                                <div>
                                    <div className="flex flex-col gap-4">
                                        <p className="subHeading3 text-neutral-black">
                                            For Referrer (We call these “Plugs”)
                                        </p>
                                        <WorkDemonstration
                                            list={FOR_REFERRER}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 md:flex hidden  items-end  max-w-[137px] justify-end">
                                <Image src={LandingPageSingleRobo} alt="robo" />
                            </div>
                        </div>
                        <div ref={contact}>
                            <Contact />
                        </div>
                        <Footer />
                    </>
                )}
            </div>
        </div>
    );
};

export { Landing };
