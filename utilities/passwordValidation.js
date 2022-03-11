export function checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;

        const validatedPassword = validatePassword(password);

        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.errors.join("<p>");
        } else {
            passwordErrorElement.innerHTML = '';
        }
}

export function validatePassword(p) {
    let errors = [];

    let result = {
        isValid: true,
        errors: errors
    }

    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters.");
    }
    if (p.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.");
    }
    if (p.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
        result.isValid = false;
    } else {
        result.isValid = true;
    }
    return result;
}