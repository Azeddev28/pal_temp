import Layout from '@/components/layout';
import { CustomQueryClientProvider } from '@/providers/react-query';
import { SessionProvider } from '@/providers/session';
import { UserProfileProvider } from '@/providers/user-profile';
import store from '@/store';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';

import '../../styles/globals.css';
// Subsets are really important. CHECK BELOW FOR MORE INFO
const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Provider store={store}>
                <SessionProvider>
                    <UserProfileProvider>
                        <CustomQueryClientProvider>
                            <main className={poppins.className}>
                                <Layout />
                                <Component {...pageProps} />
                            </main>
                        </CustomQueryClientProvider>
                    </UserProfileProvider>
                </SessionProvider>
            </Provider>
        </div>
    );
}

export default MyApp;
