import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { useState } from 'react';

const Page = () => {
    const [url] = useState('http://www.sharepalplug.com/newuser');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-row w-auto my-24">
                <div className="max-w-[51rem] body-font flex flex-col font-poppins md:p-10">
                    <div className="mb-8 text-center">
                        <Typography
                            variant={'h1'}
                            className="mb-4 text-brandBlue dark:text-brandBlue"
                        >
                            You’ve moved up the waitlist!
                        </Typography>
                    </div>
                    <div className="mb-16 text-center font-semibold">
                        <Typography variant={'h5'} className="text-grey20">
                            This means you’ll get access to palplug sooner than
                            others. We’ll notify you as soon as you’re able to
                            access your account. Help your friends get set up by
                            sharing the link.
                        </Typography>
                    </div>
                    <p className="text-xs md:text-sm 2xl:text-base font-semibold">
                        Share Link
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-2">
                        <div className="w-full">
                            <input
                                readOnly={true}
                                type="text"
                                placeholder={url}
                                value={url}
                                className="w-full p-3 bg-white border-2 border-solid rounded-lg outline-none   hover:bg-[#F5F8FF] active:border-[#8bb4ff] active:bg-[#F5F8FF] focus:border-brandBlue focus:bg-white "
                            />
                            {/* <Input
                                type="text"
                                placeholder={url}
                                value={url}
                                label={'Share Link'}
                                readOnly={true}
                            /> */}
                        </div>

                        <Button onClick={copyToClipboard}>
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
