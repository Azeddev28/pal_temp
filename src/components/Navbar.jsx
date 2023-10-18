import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import navLogo from '../../public/images/nav-logo.png';

function NavBar() {
    const handleLogoClick = (e) => {
        e.prevetDefault();
        const target = e.target;
        redirect(target.href);
    };
    return (
        <div className="bg-white shadow-grey10 shadow-sm p-5">
            <nav className="flex justify-between items-center w-[92%]">
                <Link href="/" onClick={handleLogoClick}>
                    <Image src={navLogo} alt="..." />
                </Link>
                <div className="nav-links duration-500 md:static absolute bg-grey0 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
                    {/* <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <a className="hover:text-gray-500" href="#">Products</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Solution</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Resource</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Developers</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Pricing</a>
                    </li>
                </ul> */}
                </div>
                {/* <div className="flex items-center gap-6">
                <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
                <ion-icon onclick="onToggleMenu(this)" name="menu" className="text-3xl cursor-pointer md:hidden"></ion-icon>
            </div> */}
            </nav>
        </div>
    );
}

export default NavBar;
