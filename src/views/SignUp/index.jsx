import { Button } from '@/components/Button';
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
        <div className="flex justify-center items-center flex-col h-screen font-poppins px-4">
            <div className="flex flex-col gap-[3.125rem] max-w-[44.94rem] ">
                <div className="flex flex-col items-center gap-[2.5rem]">
                    <Image src={AnnouncementRobo} />
                    <p className="heading text-brandBlue text-center">
                        Your spot is reserved! 🎉
                    </p>

                    <p className="subHeading2 text-grey20  text-center ">
                        You're on the list! We'll let you know when your spot to
                        sign up is ready
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-grey40 subHeading2  text-center">
                        If you'd like to move up in line, sign up and complete
                        your profile set up now
                    </p>
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>
                        <p className="subHeading5">Sign up</p>
                    </Button>
                </div>
            </div>
            {renderModal()}
        </div>
    );
};

export { SignUp };
