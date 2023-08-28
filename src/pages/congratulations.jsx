import { Button } from '@/components/Button';
import { Text } from '@/components/Input';
import { Typography } from '@/components/Typography';

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="py-44">
                <div className="flex flex-row w-auto mb-14">
                    <div className="px-10 w-[42rem] body-font flex flex-col font-poppins py-10">
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
                                This means you’ll get access to palplug sooner
                                than others. We’ll notify you as soon as you’re
                                able to access your account. Help your friends
                                get set up by sharing the link.
                            </Typography>
                        </div>
                        <div className="flex flex-row items-end gap-2">
                            <div className="w-full">
                                <Text
                                    placeholder={
                                        'http://www.sharepalplug.com/newuser'
                                    }
                                    label={'Share Link'}
                                />
                            </div>

                            <Button>Copy</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
