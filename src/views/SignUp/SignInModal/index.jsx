import { Modal } from '@/components/Modal';
import illustrationBoxImage from '../../../../public/images/illustration-box.jpg';
import { GithubButton, GoogleButton, LinkedInButton } from './Buttons';

const SignInModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            bannerImageSrc={illustrationBoxImage}
        >
            <div className="flex justify-center pt-9 pb-7">
                <div className="flex flex-col gap-4 w-full px-10">
                    <GoogleButton />
                    <LinkedInButton />
                    <GithubButton />
                </div>
            </div>
        </Modal>
    );
};

export { SignInModal };
