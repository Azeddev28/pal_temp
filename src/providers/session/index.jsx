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

        eventSource.onmessage = (event) => {
            if (event.data) {
                const eventMessage = event.data;
                window.sessionStorage.setItem('authCredentials', eventMessage);
                dispatch(setUserRegistrationInfo(JSON.parse(eventMessage)));
            }
            // close connection on receiving token
            if (event.data && event.data.includes('token')) {
                const token = event.data.split('token: ')[1];
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
