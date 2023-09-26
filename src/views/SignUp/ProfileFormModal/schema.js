import * as yup from 'yup';

const schema = {
    0: yup.object().shape({
        gender: yup.string().oneOf(['male', 'female', 'another']).required(),
        anotherGender: yup.string().when('gender', {
            is: (value) => value === 'another',
            then: (stringSchema) =>
                stringSchema.required(
                    'Another gender is required when gender is "another"'
                ),
            otherwise: (stringSchema) => stringSchema.notRequired(),
        }),
    }),
    1: yup.object().shape({
        language: yup.string().required('Language is required'),
        country: yup.string().required('Country is required'),
    }),
    2: yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
    }),
    3: yup.object().shape({
        purpose: yup.string().required('Purpose is required'),
    }),
    4: yup.object().shape({
        company: yup.string().required('Company is required'),
    }),
    5: yup.object().shape({
        industry: yup.string().required('Industry is required'),
    }),
    6: yup.object().shape({
        jobTitle: yup.string().required('Job title is required'),
    }),
    7: yup.object().shape({
        interestedJobTitle: yup
            .string()
            .required('Interested Job Title is required'),
    }),
};

export { schema };
