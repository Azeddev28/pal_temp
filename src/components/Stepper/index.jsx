import { useEffect, useMemo, useRef } from 'react';

const Stepper = ({
    activeStep,
    isFirstStep,
    isLastStep,
    joinSteps,
    children,
}) => {
    const containerRef = useRef();

    useEffect(() => {
        if (activeStep === children?.length - 1) isLastStep?.();
        else if (activeStep === 0) isFirstStep?.();
    }, [activeStep]);

    const activeLineWidth = useMemo(() => {
        if (!joinSteps) return;
        const { width } = containerRef?.current?.getBoundingClientRect();
        const widthPerStep = width / (children?.length - 1);
        return widthPerStep * activeStep;
    }, [activeStep, containerRef?.current, joinSteps]);

    console.log({ joinSteps });
    return (
        <div
            ref={containerRef}
            className="w-full relative flex items-center justify-between"
        >
            {joinSteps && (
                <>
                    <div className="z-10 absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-[#D9D9D9]" />
                    <div
                        className="z-20 absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-brandBlue transition-all duration-500"
                        style={{ width: `${activeLineWidth}px` }}
                    />
                </>
            )}
            {children?.map((child, index) => (
                <div
                    key={index}
                    className={`z-30 rounded-full transition-colors duration-300 ${
                        index <= activeStep
                            ? 'bg-brandBlue hover:bg-hoverBlue'
                            : 'bg-[#D9D9D9]'
                    }`}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

const Step = ({ onClick, className, children }) => (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
        {children}
    </div>
);

export { Step, Stepper };
