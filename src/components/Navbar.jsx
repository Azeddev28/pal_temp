import {
    setScrollStateContact,
    setScrollStateWorking,
    setShowMore,
} from '@/store/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import navLogo from '../../public/images/logo.svg';
function NavBar() {
    const handleLogoClick = (e) => {
        e.prevetDefault();
        const target = e.target;
        redirect(target.href);
    };

    const dispatch = useDispatch();
    const handleScrollWorking = () => {
        dispatch(setShowMore(true));
        dispatch(setScrollStateWorking(true));
    };
    const handleScrollContact = () => {
        dispatch(setShowMore(true));
        dispatch(setScrollStateContact(true));
    };
    return (
        <div className="flex flex-row bg-white shadow-grey10 shadow-sm p-5 justify-between  fixed z-10 w-full">
            <Link href="/" onClick={handleLogoClick}>
                <Image src={navLogo} alt="..." height={24} width={103} />
            </Link>
            <div className="flex flex-row gap-3 items-center">
                <p
                    className="subHeading3 text-brandBlue cursor-pointer"
                    onClick={handleScrollWorking}
                >
                    How it works
                </p>
                <div className="h-[17px] w-0.5 bg-brandBlue "></div>
                <p
                    className="subHeading3 text-brandBlue cursor-pointer"
                    onClick={handleScrollContact}
                >
                    Contact Us
                </p>
            </div>
        </div>
    );
}

export default NavBar;
