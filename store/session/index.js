import { SET_SESSION } from './types';

const sessionReducer = (state, action) => {
    switch (action.type) {
        case SET_SESSION:
            return action.payload;
        default:
            return state;
    }
};

export { sessionReducer };
