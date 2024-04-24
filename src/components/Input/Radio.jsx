import { forwardRef, useRef } from 'react';
import Tooltip from '../Tooltip';
import { Typography } from '../Typography';

const innerCircleStyles =
    "before:block before:content-[''] before:w-2 before:h-2 before:lg:w-3 before:lg:h-3 before:rounded-full before:bg-white before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 checked:before:bg-blue-60";
const baseStyles =
    'relative cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-solid border-carbon rounded-full bg-white appearance-none checked:border-blue-60 ';

const Radio = forwardRef(({ id, label, tooltip, ...rest }, ref) => {
    const radioRef = useRef(null);
    const handleTypographyClick = () => {
        if (radioRef.current) {
            radioRef.current.click();
        }
    };

    return (
        <div className="flex justify-between items-center">
            <label className="flex items-center gap-2" htmlFor={id}>
                <input
                    ref={(inputRef) => {
                        radioRef.current = inputRef;
                        if (ref) {
                            if (typeof ref === 'function') {
                                ref(inputRef);
                            } else {
                                ref.current = inputRef;
                            }
                        }
                    }}
                    {...rest}
                    type="radio"
                    className={`${baseStyles} ${innerCircleStyles} min-w-[16px]`}
                />
                {label && (
                    <div onClick={handleTypographyClick}>
                        <Typography
                            variant="body"
                            className="font-semibold"
                            style={{ cursor: 'pointer' }}
                        >
                            {label}
                        </Typography>
                    </div>
                )}
            </label>
            {tooltip && (
                <Tooltip
                    text={'what is a plug?'}
                    tooltip={
                        ' A plug is an employee at a company offering a service such as a referral, resume review or interview prep help'
                    }
                />
            )}
        </div>
    );
});

export { Radio };
