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

function createAction(type) {
    return (payload) => ({ type, payload });
}

export const updateEmail = createAction(UPDATE_EMAIL);
export const updateGender = createAction(UPDATE_GENDER);
export const updateAnotherGender = createAction(UPDATE_ANOTHER_GENDER);
export const updateLanguage = createAction(UPDATE_LANGUAGE);
export const updateCountry = createAction(UPDATE_COUNTRY);
export const updateFirstName = createAction(UPDATE_FIRST_NAME);
export const updateLastName = createAction(UPDATE_LAST_NAME);
export const updatePurpose = createAction(UPDATE_PURPOSE);
export const updateCompany = createAction(UPDATE_COMPANY);
export const updateIndustry = createAction(UPDATE_INDUSRTY);
export const updateJobTitle = createAction(UPDATE_JOB_TITLE);
export const updateInterestedJobTitle = createAction(
    UPDATE_INTERESTED_JOB_TITLE
);

export const updateProfile = (data) => {
    const {
        gender,
        anotherGender,
        language,
        country,
        firstName,
        lastName,
        purpose,
        company,
        industry,
        jobTitle,
        interestedJobTitle,
        email,
    } = data;
    return {
        payload: {
            gender,
            anotherGender,
            language,
            country,
            firstName,
            lastName,
            purpose,
            company,
            industry,
            jobTitle,
            interestedJobTitle,
            email,
        },
    };
};
