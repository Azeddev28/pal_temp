import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Typography } from '@/components/Typography';

import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="py-44">
                <div className="flex flex-row w-auto mb-14">
                    <div className="px-10 w-[42rem] body-font flex flex-col font-poppins py-10">
                        <div className="mb-8 text-center">
                            <Typography
                                variant={'h2'}
                                className="mb-4 text-brandBlue dark:text-brandBlue"
                            >
                                Your spot is reserved! 🎉
                            </Typography>
                        </div>
                        <div className="mb-10 text-center font-semibold">
                            <Typography variant={'h5'} className="text-grey20 ">
                                You're on the list! We'll let you know when your
                                spot to sign up is ready
                            </Typography>
                        </div>
                        <div className="mb-6 text-center font-semibold">
                            <Typography variant={'h5'} className="text-grey40">
                                If you'd like to move up in line, sign up and
                                complete your profile set up now
                            </Typography>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button
                                className="w-[156px] h-[48px]"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bannerImageSrc={
                    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500'
                }
            >
                <div className="p-10">
                    <div className="mb-8 text-center">
                        <Typography
                            variant={'h3'}
                            className="mb-4 font-extrabold"
                        >
                            Whats Up?
                        </Typography>
                        <Typography variant={'body'} className="text-gray-600">
                            Feeling sick? Have a Coffee
                        </Typography>
                    </div>
                    <div className="space-y-4">
                        <Button className="w-full">Make a Coffee</Button>
                        <Button className="w-full">Make a Tee</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
