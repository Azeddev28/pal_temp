let client = {};
const updateClient = (responseObj) => {
    if (responseObj) {
        client = responseObj;
    }
};
export { client, updateClient };
