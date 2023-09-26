import { UserProfileContext } from '@/providers/user-profile';
import { useContext } from 'react';

const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (typeof context === 'undefined')
        throw new Error(
            'useUserProfile hook should only be used in child component of UserProfileProvider'
        );
    return context;
};

export { useUserProfile };
