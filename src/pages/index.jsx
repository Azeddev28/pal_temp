import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';
import _ from 'lodash';

import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(null);
    const setDebounceEmail = _.debounce((email) => {
        setEmail(email);
        setIsEmailValid(null);
    }, 200);
    let handleOnChangeEmail = (email) => {
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };
    return (
        <div className="px-12 font-semibold">
            <div className="py-44">
                <div className="flex flex-row w-auto mb-14">
                    <div className="px-10 w-[64rem] body-font flex flex-col font-poppins py-10">
                        <div className="mb-8 text-center">
                            <Typography
                                variant="h1"
                                // text-3xl overwrites the font size on mobile screen
                                className="text-3xl mb-4 text-brandBlue dark:text-brandBlue"
                            >
                                Looking for a referral or want to get paid to
                                refer others?
                            </Typography>
                        </div>
                        <div className="mb-20 text-center">
                            <Typography
                                variant="h4"
                                className="text-grey20 font-semibold"
                            >
                                Whether you want to get job of your dreams or
                                want to get paid to help someone get there,
                                PalPlug is the platform to help you connect. Get
                                early access below.
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Typography
                                variant="body"
                                className="text-black font-semibold"
                            >
                                Join Blake, Kareem and 2165 others on the
                                waitlist
                            </Typography>
                            <div className="flex gap-4">
                                <Input
                                    className="w-full"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) =>
                                        setDebounceEmail(e.target.value)
                                    }
                                />
                                <Button
                                    onClick={() => handleOnChangeEmail(email)}
                                >
                                    Join waitlist
                                </Button>
                            </div>
                        </div>
                        Input
                        {isEmailValid === false ? (
                            <div className="mt-2">
                                <p className="text-red-400 font-semibold">
                                    Invalid Email
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="basis-1/2 flex">
                        <div className="flex items-center justify-center flex-auto font-bold text-4xl border border-solid border-grey20">
                            PLACEHOLDER
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-12 px-10">
                    <Typography variant="body" className="text-grey20">
                        Get referrals to top companies like
                    </Typography>
                    <div className="flex flex-row gap-10 items-center justify-center">
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                        <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
                            {/* <NextJSIcon className="w-16 h-16" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
