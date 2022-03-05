export function validateEmail(email) {
    let userEmail = {
        isValid: false
    }

    let regexp = /\S+@\S+\.\S+/;
    const isValid = regexp.test(email);

    if (isValid) {
        userEmail.isValid = true;
    }

    return userEmail;
}