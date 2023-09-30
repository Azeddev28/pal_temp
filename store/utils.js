const createAction = (type) => {
    return (payload) => ({ type, payload });
};

export { createAction };
