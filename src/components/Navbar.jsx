import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import navLogo from '../../public/images/logo.svg';

function NavBar() {
    const handleLogoClick = (e) => {
        e.prevetDefault();
        const target = e.target;
        redirect(target.href);
    };
    return (
        <div className="flex flex-row bg-white shadow-grey10 shadow-sm p-5 justify-between">
            <Link href="/" onClick={handleLogoClick}>
                <Image src={navLogo} alt="..." />
            </Link>
            <div className="flex flex-row gap-3">
                <p className="subHeading3 text-brandBlue">How it works</p>
                <div className="h-[17px] w-0.5 bg-brandBlue"></div>
                <p className="subHeading3 text-brandBlue">Contact Us</p>
            </div>
        </div>
    );
}

export default NavBar;
