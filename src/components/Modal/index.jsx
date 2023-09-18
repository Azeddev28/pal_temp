import { CloseFilledIcon } from '@/Icons';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, bannerImageSrc, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-10">
            <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-xl bg-white sm:rounded-2xl scrollbar-hide">
                <div className="w-full relative">
                    {onClose && (
                        <div className="flex absolute top-0 right-0">
                            <span className="py-3 px-4">
                                <CloseFilledIcon
                                    className="text-brandBlue hover:text-hoverBlue focus:text-pressedBlue transition-colors duration-200 w-8 h-8 hover:cursor-pointer"
                                    onClick={onClose}
                                />
                            </span>
                        </div>
                    )}
                    {bannerImageSrc && (
                        <div className="flex items-center justify-center w-full h-full">
                            <Image
                                src={bannerImageSrc}
                                className="w-full h-auto max-h-96 object-cover object-center"
                                alt="modal-banner-image"
                            />
                        </div>
                    )}
                    <div className="min-w-[400px]">{children}</div>
                </div>
            </div>
        </div>
    );
};

export { Modal };
