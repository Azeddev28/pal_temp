const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
};
let client = {};
const updateClient = (responseObj) => {
    if (responseObj) {
        client = responseObj;
    }
};
export { client, debounce, updateClient };
