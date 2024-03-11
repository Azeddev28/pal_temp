import { forwardRef, useRef } from 'react';
import { Typography } from '../Typography';

const innerCircleStyles =
    "before:block before:content-[''] before:w-2 before:h-2 before:lg:w-3 before:lg:h-3 before:rounded-full before:bg-white before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 checked:before:bg-blue-60";
const baseStyles =
    'relative cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-solid border-carbon rounded-full bg-white appearance-none checked:border-blue-60';

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
                    className={`${baseStyles} ${innerCircleStyles}`}
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
                <div className="has-tooltip">
                    <p className="text-sm font-normal text-grey20 underline">
                        what is a plug?
                    </p>
                    <p className="tooltip text-xs rounded-lg shadow-lg p-2 bg-gray-100 text-grey20 border-gray-800 -mt-24 -ml-32 w-64 h-16">
                        A plug is an employee at a company offering a service
                        such as a referral, resume review or interview prep help
                    </p>
                </div>
            )}
        </div>
    );
});

export { Radio };
