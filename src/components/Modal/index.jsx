import { CloseFilledIcon } from '@/Icons';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, bannerImageSrc, children, height }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 md:p-10 z-20">
            <div
                className={`max-h-full ${
                    height &&
                    'h-[85%] sm:h-[95%] md:h-[75%] xl:h-[55%] 2xl:h-[30%]'
                } w-full max-w-xl overflow-y-auto rounded-xl bg-white sm:rounded-2xl scrollbar-hide`}
            >
                <div className={`w-full relative ${height && 'h-full'}`}>
                    {onClose && (
                        <div className="flex absolute top-0 right-0">
                            <span className="py-3 px-4">
                                <CloseFilledIcon
                                    className="text-brandBlue hover:text-hoverBlue focus:text-pressedBlue transition-colors duration-200 w-6 h-6 hover:cursor-pointer md:w-8 md:h-8"
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
                    <div className="md:min-w-[400px] h-full">{children}</div>
                </div>
            </div>
        </div>
    );
};

export { Modal };
