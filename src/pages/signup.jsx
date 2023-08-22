import { NextJSIcon } from '@/Icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';

import { useState } from 'react';


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="py-44">
                <div className="flex flex-row w-auto mb-14">
                    <div className="px-10 w-[42rem] body-font flex flex-col font-poppins py-10">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-4xl font-bold text-brandBlue dark:text-brandBlue">
                                Your spot is reserved! 🎉
                            </h1>
                        </div>
                        <div className="mb-10 text-center font-semibold">
                            <h4 className="text-grey20 text-xl">
                                You're on the list! We'll let you know when your spot to sign
                                up is ready
                            </h4>
                        </div>
                        <div className="mb-6 text-center font-semibold">
                            <h4 className="text-grey40 text-xl">
                                If you'd like to move up in line, sign up and complete your profile set up now
                            </h4>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button className="w-[156px] h-[48px]" onClick={() => setIsModalOpen(true)}>
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
                        <h1 className="mb-4 text-3xl font-extrabold">Whats Up?</h1>
                        <p className="text-gray-600">Feeling sick? Have a Coffee</p>
                    </div>
                    <div className="space-y-4">
                        <Button className="w-full">Make a Coffee</Button>
                        <Button className="w-full">Make a Tee</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}