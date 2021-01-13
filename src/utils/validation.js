export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
}
export const validatePassword = (password) => {
    return password && password.length >= 8;
}
export const validateUserName = (name) => {
    return name && name.length >= 1;
} 