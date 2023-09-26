import {
    UPDATE_ANOTHER_GENDER,
    UPDATE_COMPANY,
    UPDATE_COUNTRY,
    UPDATE_EMAIL,
    UPDATE_FIRST_NAME,
    UPDATE_GENDER,
    UPDATE_INDUSRTY,
    UPDATE_INTERESTED_JOB_TITLE,
    UPDATE_JOB_TITLE,
    UPDATE_LANGUAGE,
    UPDATE_LAST_NAME,
    UPDATE_PURPOSE,
} from './actions';

// Define an initial state for your reducer
export const initialState = {
    email: '',
    gender: '',
    anotherGender: '',
    language: '',
    country: '',
    firstName: '',
    lastName: '',
    purpose: '',
    company: '',
    industry: '',
    jobTitle: '',
    interestedJobTitle: '',
};

// Reducer function
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case UPDATE_GENDER:
            return { ...state, gender: action.payload };
        case UPDATE_ANOTHER_GENDER:
            return { ...state, anotherGender: action.payload };
        case UPDATE_LANGUAGE:
            return { ...state, language: action.payload };
        case UPDATE_COUNTRY:
            return { ...state, country: action.payload };
        case UPDATE_FIRST_NAME:
            return { ...state, firstName: action.payload };
        case UPDATE_LAST_NAME:
            return { ...state, lastName: action.payload };
        case UPDATE_PURPOSE:
            return { ...state, purpose: action.payload };
        case UPDATE_COMPANY:
            return { ...state, company: action.payload };
        case UPDATE_INDUSRTY:
            return { ...state, industry: action.payload };
        case UPDATE_JOB_TITLE:
            return { ...state, jobTitle: action.payload };
        case UPDATE_INTERESTED_JOB_TITLE:
            return { ...state, interestedJobTitle: action.payload };
        default:
            return action.payload ?? state;
    }
};

export { profileReducer };
