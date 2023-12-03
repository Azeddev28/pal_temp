import Layout from '@/components/layout';
import { CustomQueryClientProvider } from '@/providers/react-query';
import { SessionProvider } from '@/providers/session';
import { UserProfileProvider } from '@/providers/user-profile';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";


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
                        <CustomQueryClientProvider>
                            <UserProvider>
                            <main className={poppins.className}>
                                <Layout />
                                <Component {...pageProps} />
                            </main>
                            </UserProvider>
                        </CustomQueryClientProvider>
                    </UserProfileProvider>
                {/* </SessionProvider> */}
        </div>
    );
}

export default wrapper.withRedux(MyApp);