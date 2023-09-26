import { debounce } from '@/utils';

import { useEffect, useState } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!window) return;
        const updateSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', debounce(updateSize, 250));

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return isMobile;
};

export { useIsMobile };
