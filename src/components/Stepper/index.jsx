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
        isLastStep?.(activeStep === children?.length - 1);
        isFirstStep?.(activeStep === 0);
    }, [activeStep]);

    const activeLineWidth = useMemo(() => {
        if (!joinSteps) return;
        const rect = containerRef?.current?.getBoundingClientRect();
        const widthPerStep = (rect?.width ?? 0) / (children?.length - 1);
        return widthPerStep * activeStep;
    }, [activeStep, containerRef?.current, joinSteps]);

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
                        index === activeStep
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
