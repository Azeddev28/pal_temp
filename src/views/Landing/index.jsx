import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import Card from '@/components/Card';
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
import {
    setAuthState,
    setHasJoinedWaitlist,
    setIsUserRegistered,
} from '../../store/authSlice';
import { wrapper } from '../../store/store';

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
        .required('Please enter email'),
});

const Landing = () => {
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
                    <div className="md:py-5 py-2 animate-marquee whitespace-nowrap flex flex-row">
                        {Social_Icons.slice(0, 6).map((item, index) => (
                            <span className="h-[90px] w-[90px] flex items-center justify-center">
                                <Image
                                    src={item}
                                    alt="social-icons"
                                    className="inline"
                                />
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 md:py-5 py-2 animate-marquee2 whitespace-nowrap flex flex-row">
                        {Social_Icons.slice(7, 13).map((item, index) => (
                            <span className="h-[90px] w-[90px] flex items-center justify-center">
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
                                        className={'w-full md:w-fit'}
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
                <div className="flex md:flex-row flex-col gap-[60px] max-w-[1236px] m-auto md:pb-10 pb-5">
                    {PalPlug_Services.map((item, index) => (
                        <div className="max-w-[372px] w-full" key={index}>
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
                <div className="flex m-auto py-2 px-4 rounded-27"></div>

                <div className="flex md:flex-col md:gap-10 bg-whiteSmoke md:[pt-20 pr-8 pb-20 pl-16] pt-8 pr-0 pb-10 pl-8">
                    {/* 1 slider */}

                    <div className="flex flex-col md:gap-4 mb-2">
                        <p className="heading">How it Works: </p>
                        <p className="subHeading3 text-neutral-black">
                            For Job Seeker
                        </p>
                        <WorkDemonstration list={For_Job_Seekers} />
                    </div>
                    {/* 2 slider */}
                    <div className="gap-2">
                        <p className="subHeading3 text-neutral-black">
                            For Referrer (We call these “Plugs”)
                        </p>
                        <WorkDemonstration list={FOR_REFERRER} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Landing };
