export function checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;

        const validatedPassword = validatePassword(password);

        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
}

export function validatePassword(p) {
    let error = '';

    let result = {
        isValid: false,
        error: error
    }

    if (p.length < 8) {
        result.error = "Your password must be at least 8 characters.";
    } else if (p.search(/[a-z]/) < 0) {
        result.error = "Your password must contain at least one lowercase letter.";
    } else if (p.search(/[A-Z]/) < 0) {
        result.error = "Your password must contain at least one uppercase letter.";
    } else if (p.search(/[0-9]/) < 0) {
        result.error = "Your password must contain at least one digit.";
    } else {
        result.isValid = true;
    }
    return result;
}