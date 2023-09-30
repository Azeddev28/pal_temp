import { profileReducer } from './profile';
import { sessionReducer } from './session';

const reducers = {
    profile: profileReducer,
    session: sessionReducer,
};

export default combineReducers(reducers);
