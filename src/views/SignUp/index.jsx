import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileFormModal } from './ProfileFormModal';
import { SignInModal } from './SignInModal';

const SignUp = () => {
    const { isUserRegistered, hasJoinedWaitlist } = useSelector((state) => {
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
        if (hasJoinedWaitlist) {
            <SignInModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />;
        }
    };
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
            {renderModal()}
        </div>
    );
};

export { SignUp };
