import {
    setScrollStateContact,
    setScrollStateWorking,
} from '@/store/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import navLogo from '../../public/images/logo.svg';
import { useRouter } from 'next/router';
function NavBar() {
    const router = useRouter();
    const currentUrl = router.pathname;

    const handleLogoClick = (e) => {
        e.prevetDefault();
        const target = e.target;
        redirect(target.href);
    };

    const dispatch = useDispatch();
    const handleScrollWorking = () => {
        dispatch(setScrollStateWorking(true));
    };
    const handleScrollContact = () => {
        dispatch(setScrollStateContact(true));
    };
    return (
        <div className="flex flex-row bg-white shadow-grey10 shadow-sm p-5 justify-between  fixed z-10 w-full">
            <Link href="/" onClick={handleLogoClick}>
                <div className="relative screen_360:h-[24px] screen_360:w-[103px] h-[25px] w-[80px]">
                    <Image src={navLogo} alt="..." fill />
                </div>
            </Link>

            {currentUrl === '/' && (
                <div className="flex flex-row screen_360:gap-3 gap-2 items-center screen_360:w-full w-[58%] justify-end">
                    <p
                        className="screen_360:subHeading3 font-semibold text-[10px]  text-brandBlue cursor-pointer"
                        onClick={handleScrollWorking}
                    >
                        How it works
                    </p>
                    <div className="screen_360:h-[17px]  h-[14px] w-0.5 bg-brandBlue "></div>
                    <p
                        className="screen_360:subHeading3 font-semibold text-[10px] text-brandBlue cursor-pointer"
                        onClick={handleScrollContact}
                    >
                        Contact Us
                    </p>
                </div>
            )}
        </div>
    );
}

export default NavBar;
