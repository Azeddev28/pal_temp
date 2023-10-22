import { setUserRegistrationInfo } from '@/store/authSlice';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const SessionContext = createContext();

const SessionProvider = ({ children, session }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(session);
    useEffect(() => {
        const eventSource = new EventSource('/api/sse', {
            withCredentials: true,
        });

        eventSource.onmessage = ({ data }) => {
            if (data) {
                window.sessionStorage.setItem(
                    'accessToken',
                    JSON.parse(data).access_token
                );
                dispatch(setUserRegistrationInfo(JSON.parse(data)));
            }
            // close connection on receiving token
            if (data && data.includes('token')) {
                const token = data.split('token: ')[1];
                setData(token);
                eventSource.close();
            }
        };

        eventSource.onerror = (error) => {
            console.error('Error occurred:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);
    return (
        <SessionContext.Provider value={{ data, update: setData }}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };
