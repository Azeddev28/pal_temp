import {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
} from './Steps';

export const STEP_COUNT = 6;

export const STEP_TYPE = {
    Conditional: 'conditional',
    Linear: 'linear',
};

export const STEPS = [
    {
        type: STEP_TYPE.Linear,
        render: Step1,
        next: 1,
    },
    {
        type: STEP_TYPE.Linear,
        render: Step2,
        next: 2,
    },
    {
        type: STEP_TYPE.Linear,
        render: Step3,
        next: 3,
    },
    {
        type: STEP_TYPE.Conditional,
        render: Step4,
        next: {
            fieldName: 'purpose',
            branch: {
                Plug: 4,
                Pal: 6,
            },
        },
    },
    {
        type: STEP_TYPE.Linear,
        render: Step5,
        next: 5,
    },
    {
        type: STEP_TYPE.Linear,
        render: Step6,
    },
    {
        type: STEP_TYPE.Linear,
        render: Step7,
        next: 7,
    },
    {
        type: STEP_TYPE.Linear,
        render: Step8,
    },
];
