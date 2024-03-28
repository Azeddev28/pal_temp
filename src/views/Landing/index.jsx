import ChevronDown from '@/Icons/ChevronDown';
import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import Card from '@/components/Card';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Input } from '@/components/Input';
import WorkDemonstration from '@/components/WorkDemonstration';
import theme from '@/components/theme';
import { getRoute } from '@/server';
import {
    FOR_REFERRER,
    For_Job_Seekers,
    PalPlug_Services,
    Social_Icons,
} from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import LandingPageRobos from '../../../public/images/LandingPageRobos.svg';
import LandingPageSingleRobo from '../../../public/images/LandingPageSingleRobo.svg';
import {
    setAuthState,
    setHasJoinedWaitlist,
    setIsUserRegistered,
} from '../../store/authSlice';
import { wrapper } from '../../store/store';

import { useUser } from '@auth0/nextjs-auth0/client';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            // we can set the initial state from here

            await store.dispatch(setAuthState(false));
            console.log('State on server', store.getState());
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
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, error, isLoading } = useUser();

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
    if (!isLoading && user) {
        console.log(user);
        updateWaitListStatusAndRedirect();
        dispatch(setIsUserRegistered());
    }

    const onSubmit = ({ email }) => {
        // updateWaitListStatusAndRedirect();
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
                    if (code === 'USER_ALREADY_REGISTERED') {
                        dispatch(setIsUserRegistered());
                        router.push('/congratulations', undefined, {
                            shallow: true,
                        });
                    }
                }
            );
    };

    return (
        <div>
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
                <div className="flex md:pt-[60px] md:pr-4 md:pb-14 md:pl-14  flex-col pt-0 pr-5 pb-4 pl-5">
                    <div className="flex md:gap-16 md:flex-row gap-8 md:p-2 flex-col-reverse w-full">
                        <div className="flex  md:max-w-[46.5%] md:gap-[74px] gap-6 flex-col w-full justify-between">
                            <div className="flex md:gap-10 gap-4 flex-col">
                                <p className="heading">
                                    Looking for a referral or want to get paid
                                    to refer others?
                                </p>
                                <p className="subHeading2">
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
                                    className="flex gap-2 flex-col md:flex-row md:justify-start md:items-center w-full"
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
                        <div className="md:max-w-[53%] w-full">
                            <Image src={LandingPageRobos} />
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-[60px] max-w-[1236px] px-16 m-auto md:pb-10 pb-5 box-content">
                    {PalPlug_Services.map((item, index) => (
                        <div className="lg:w-[50%]  md:w-full" key={index}>
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
                <div className="flex m-auto py-2 px-3 rounded-[27px] gap-2.5 w-[184px] shadow-custom mb-6">
                    <p className="subHeading3 text-trueBlack">
                        Scroll to learn more
                    </p>
                    <ChevronDown />
                </div>
                <div className="grid grid-cols-10 bg-whiteSmoke md:pt-20 md:pr-8 md:pb-20 md:pl-16 pt-8 pr-0 pb-10 pl-8">
                    <div className="md:col-span-9 col-span-10 flex  md:flex-col flex-col md:gap-10  ">
                        <div className="flex flex-col md:flex-col md:gap-4 mb-2">
                            <p className="heading">How it Works: </p>
                            <p className="subHeading3 text-neutral-black">
                                For Job Seeker
                            </p>
                            <WorkDemonstration list={For_Job_Seekers} />
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <p className="subHeading3 text-neutral-black">
                                    For Referrer (We call these “Plugs”)
                                </p>
                                <WorkDemonstration list={FOR_REFERRER} />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 md:flex hidden  items-end  max-w-[137px] justify-end">
                        <Image src={LandingPageSingleRobo} alt="robo" />
                    </div>
                </div>
                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export { Landing };
