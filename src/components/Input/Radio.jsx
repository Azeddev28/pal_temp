import { Typography } from '../Typography';

const innerCircleStyles =
    "before:block before:content-[''] before:w-2 before:h-2 before:lg:w-3 before:lg:h-3 before:rounded-full before:bg-white before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 checked:before:bg-blue-60";
const baseStyles =
    'relative cursor-pointer w-4 h-4 lg:w-5 lg:h-5 border border-solid border-carbon rounded-full bg-white appearance-none checked:border-blue-60';

const Radio = ({ id, label, ...rest }) => (
    <label className="flex items-center gap-2" htmlFor={id}>
        <input
            {...rest}
            type="radio"
            className={`${baseStyles} ${innerCircleStyles}`}
        />
        {label && (
            <Typography variant={'body'} className={'font-semibold'}>
                {label}
            </Typography>
        )}
    </label>
);

export { Radio };
