import { createContext, useState } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children, session }) => {
    const [data, setData] = useState(session);
    return (
        <SessionContext.Provider value={{ data, update: setData }}>
            {children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };
