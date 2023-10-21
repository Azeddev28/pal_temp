// @ts-nocheck
import { postRequest } from '@/axios';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { getRoute } from '@/server';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import desktopImage from '../../../public/images/desktop.png';
import { setAuthState, setIsUserRegistered } from '../../store/authSlice';
import { wrapper } from '../../store/store';
import { CompanyLogoWidgetList } from './CompanyLogoWidgetList';

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

    const onSubmit = ({ email }) => {
        postRequest(getRoute('joinWaitlist'), { email })
            .then((res) => {
                router.push('/signup', undefined, {
                    shallow: true,
                });
            })
            .catch(
                ({
                    response: {
                        data: { code: code },
                    },
                }) => {
                    if (code === 'WAITLIST_JOINED') {
                        router.push('/signup', undefined, {
                            shallow: true,
                        });
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
            <div className="pt-8 md:pt-24 lg:pt-28">
                <div className="flex flex-col md:flex-row md:gap-10 lg:gap-16 xl:justify-between">
                    <div className="order-1 md:order-2 md:w-1/2">
                        <div className="flex justify-end items-center h-full">
                            <Image src={desktopImage} alt="..." />
                        </div>
                    </div>
                    <div className="order-2 md:order-1 md:w-1/2">
                        <div className="h-full flex flex-col items-center justify-center p-5 gap-10 lg:gap-16 xl:pl-24">
                            <div className="flex flex-col text-center gap-10">
                                <h1 className="text-3xl lg:text-[42px] mb-4 text-brandBlue dark:text-brandBlue font-bold leading-10">
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
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex gap-2 flex-col md:flex-row md:justify-start"
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
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 px-5 pb-5 lg:gap-10 lg:px-10 lg:pb-10 xl:px-24">
                <p className="text-xs font-semibold text-grey20 lg:text-sm">
                    Get referrals to top companies like
                </p>
                <CompanyLogoWidgetList />
            </div>
        </div>
    );
};

export { Landing };
