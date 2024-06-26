import Layout from '@/components/layout';
import { UserProfileProvider } from '@/providers/user-profile';
import { Poppins } from 'next/font/google';
import { wrapper } from "../store/store";


import '../../styles/globals.css';
// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

function MyApp({ Component, ...pageProps }) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <div>
            {/* Hacky way of making state persist both client and server side */}
            {/* TODO: Look for a better way to share state */}
                {/* <SessionProvider> */}
                    <UserProfileProvider>
                            <main className={poppins.className}>
                                <Layout />
                                <Component {...pageProps} />
                            </main>
                    </UserProfileProvider>
                {/* </SessionProvider> */}
        </div>
    );
}

export default wrapper.withRedux(MyApp);