import { profileReducer } from './profile';

const reducers = {
    profile: profileReducer,
};

export default combineReducers(reducers);
