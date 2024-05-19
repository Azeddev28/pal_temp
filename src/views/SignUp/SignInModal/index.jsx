import { Modal } from '@/components/Modal';
import SignInPagePicture from '../../../../public/images/SignInPagePicture.svg';
import { GithubButton, GoogleButton, LinkedInButton } from './Buttons';
import { useSelector } from 'react-redux';

const SignInModal = ({ isOpen, onClose }) => {
    const waitListEmail = useSelector((state) => state.auth.waitListEmail);
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            bannerImageSrc={SignInPagePicture}
        >
            <div className="flex justify-center pt-9 pb-7">
                <div className="flex flex-col gap-4 w-full px-10">
                    <GoogleButton waitListEmail={waitListEmail}/>
                    <LinkedInButton waitListEmail={waitListEmail}/>
                    <GithubButton waitListEmail={waitListEmail}/>
                </div>
            </div>
        </Modal>
    );
};

export { SignInModal };
