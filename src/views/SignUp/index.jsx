import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AnnouncementRobo from '../../../public/images/AnnouncementRobo.svg';
import { ProfileFormModal } from './ProfileFormModal';
import { SignInModal } from './SignInModal';
const SignUp = () => {
    const { isUserRegistered, hasJoinedWaitList } = useSelector((state) => {
        return state.auth;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const renderModal = () => {
        if (isUserRegistered) {
            return (
                <ProfileFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            );
        }
        if (hasJoinedWaitList) {
            return (
                <SignInModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            );
        }
    };
    return (
        <div className="flex justify-center items-center flex-col h-screen font-poppins">
            <div className="flex flex-col gap-[3.125rem] max-w-[44.94rem] ">
                <div className="flex flex-col items-center gap-[2.5rem]">
                    <Image src={AnnouncementRobo} />
                    <Typography variant={'h2'} className="text-brandBlue">
                        Your spot is reserved! 🎉
                    </Typography>

                    <Typography variant={'h5'} className="text-grey20 ">
                        You're on the list! We'll let you know when your spot to
                        sign up is ready
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Typography variant={'h5'} className="text-grey40">
                        If you'd like to move up in line, sign up and complete
                        your profile set up now
                    </Typography>
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>
                        <Typography variant={'body'}>Sign up</Typography>
                    </Button>
                </div>
            </div>
            {renderModal()}
        </div>
    );
};

export { SignUp };
