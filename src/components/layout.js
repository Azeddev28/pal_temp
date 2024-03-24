import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <>
            <link rel="icon" href="/public/favicon.ico" />
            <Navbar />
            <main>{children}</main>
        </>
    );
}
