export function checkEmail(formElement, emailErrorElement) {
    const email = formElement.email.value;

    const validatedEmail = validateEmail(email);

    if (!validatedEmail.isValid) {
        emailErrorElement.innerHTML = 'Email is not valid!'
    } else {
        emailErrorElement.innerHTML = '';
    }
}

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