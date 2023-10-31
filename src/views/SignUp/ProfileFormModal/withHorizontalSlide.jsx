import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const withHorizontalSlide =
    (Component) =>
    ({ children, slideDirection, ...props }) => {
        const motionProps = {
            initial: {
                x: slideDirection === 'left' ? '100%' : '-100%',
                opacity: 0,
            },
            animate: {
                x: 0,
                opacity: 1,
            },
            exit: {
                x: slideDirection === 'left' ? '-100%' : '100%',
                opacity: 0,
                transition: { duration: 0.1 },
            },
        };
        return (
            <motion.div {...motionProps}>
                <Component {...props}>{children}</Component>
            </motion.div>
        );
    };

withHorizontalSlide.propTypes = {
    children: PropTypes.node,
    slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
    props: PropTypes.object,
};

export { withHorizontalSlide };
