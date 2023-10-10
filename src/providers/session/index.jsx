import { createContext, useEffect, useState } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children, session }) => {
    const [data, setData] = useState(session);
    useEffect(() => {
        const eventSource = new EventSource('/api/sse', {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            if (event.data) {
                const eventMessage = event.data.split('Message:');
                window.sessionStorage.setItem('message', eventMessage[1]);
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
