import { NextJSIcon } from '@/Icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';

import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="px-12 font-semibold">
      <div className="py-44">
        <div className="flex flex-row w-auto mb-14">
          <div className="px-10 w-[64rem] body-font flex flex-col font-poppins py-10">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-5xl   text-brandBlue dark:text-brandBlue">
                Looking for a referral or want to get paid to refer others?
              </h1>
            </div>
            <div className="mb-20 text-center">
              <h4 className="text-grey20 text-2xl">
                Whether you want to get job of your dreams or want to get paid
                to help someone get there, PalPlug is the platform to help you
                connect. Get early access below.
              </h4>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black font-semibold">
                Join Blake, Kareem and 2165 others on the waitlist
              </p>
              <div className="flex gap-4">
                <Input type="text" placeholder="Enter your email" />
                <Button>Join waitlist</Button>
              </div>
            </div>
          </div>
          <div className="basis-1/2 flex">
            {/* Temporary */}
            <div className="flex items-center justify-center flex-auto font-bold text-4xl border border-solid border-grey20">
              PLACEHOLDER
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-10">
          <p className="text-grey20">Get referrals to top companies like</p>
          <div className="flex flex-row gap-10 items-center justify-center">
            {/* Temporary Social Icons placeholders */}
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
            <div className="rounded-[2.2rem] w-28 h-28 border border-solid border-grey10 bg-white shadow-lg flex items-center justify-center">
              <NextJSIcon className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
      {/* Temporary */}
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
  );
}
