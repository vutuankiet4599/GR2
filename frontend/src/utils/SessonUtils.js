const SessionUtils = {
    get: (key) => JSON.parse(sessionStorage.getItem(key)),
    set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    delete: (key) => sessionStorage.removeItem(key),
    reset: () => sessionStorage.clear(),
};

export default SessionUtils;
