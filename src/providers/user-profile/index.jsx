import { createContext, useReducer } from 'react';
import { initialState, profileReducer } from './reducer';

const UserProfileContext = createContext({});

const UserProfileProvider = ({ children, userInfo }) => {
    const [profile, dispatch] = useReducer(
        profileReducer,
        userInfo ?? initialState
    );
    return (
        <UserProfileContext.Provider value={{ profile, dispatch }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export { UserProfileContext, UserProfileProvider };
