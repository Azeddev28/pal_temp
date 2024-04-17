import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const generateActionCreator = (type) => {
    return (payload) => ({ type, payload });
};

const initStore = (initialState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
        devTools: true,
    });

let store;

const initializeStore = (preloadedState) => {
    let initialStore = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        initialStore = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') {
        return initialStore;
    }
    // Create the store once in the client
    if (!store) store = initialStore;

    return initialStore;
};

export { generateActionCreator, initializeStore };
