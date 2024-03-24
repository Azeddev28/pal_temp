import {
    CompanySelector,
    CountrySelector,
    GenderSelector,
    InterestedIndustrySelector,
    InterestedJobSelector,
    JobSelector,
    NameSelector,
    RoleSelector,
} from './Steps';
import { withHorizontalSlide } from './withHorizontalSlide';

export const STEP_COUNT = 6;

export const STEP_TYPE = {
    Conditional: 'conditional',
    Linear: 'linear',
};

export const STEPS = [
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(GenderSelector),
        next: 1,
    },
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(CountrySelector),
        next: 2,
    },
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(NameSelector),
        next: 3,
    },
    {
        type: STEP_TYPE.Conditional,
        component: withHorizontalSlide(RoleSelector),
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
        component: withHorizontalSlide(CompanySelector),
        next: 5,
    },
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(InterestedIndustrySelector),
    },
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(JobSelector),
        next: 7,
    },
    {
        type: STEP_TYPE.Linear,
        component: withHorizontalSlide(InterestedJobSelector),
    },
];
