export function validateEmail(email) {
    let regexp = /\S+@\S+\.\S+/;
    return regexp.test(email);
}