
export const setValue = (key, value) => {
        localStorage.setItem(key, value);
};

export const getValue = (key) => {
        return localStorage.getItem(key);
};

export const removeValue = (key) => {
        localStorage.removeItem(key);
};
