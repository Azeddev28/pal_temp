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

function generateActionCreator(type) {
    return (payload) => ({ type, payload });
}

export const updateEmail = generateActionCreator(UPDATE_EMAIL);
export const updateGender = generateActionCreator(UPDATE_GENDER);
export const updateAnotherGender = generateActionCreator(UPDATE_ANOTHER_GENDER);
export const updateLanguage = generateActionCreator(UPDATE_LANGUAGE);
export const updateCountry = generateActionCreator(UPDATE_COUNTRY);
export const updateFirstName = generateActionCreator(UPDATE_FIRST_NAME);
export const updateLastName = generateActionCreator(UPDATE_LAST_NAME);
export const updatePurpose = generateActionCreator(UPDATE_PURPOSE);
export const updateCompany = generateActionCreator(UPDATE_COMPANY);
export const updateIndustry = generateActionCreator(UPDATE_INDUSRTY);
export const updateJobTitle = generateActionCreator(UPDATE_JOB_TITLE);
export const updateInterestedJobTitle = generateActionCreator(
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
