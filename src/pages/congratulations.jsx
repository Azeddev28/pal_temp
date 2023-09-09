import { withAutherization } from '@/auth/withAutherization';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
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
                <div className="px-10 w-[51rem] body-font flex flex-col font-poppins py-10">
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
                    <div className="flex flex-row items-end gap-2">
                        <div className="w-full">
                            <Input
                                type="text"
                                placeholder={url}
                                value={url}
                                label={'Share Link'}
                                readOnly={true}
                            />
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

export default withAutherization(Page);
