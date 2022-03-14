export class ValidateService {
    handleValidationResult(validatedEmail, emailErrorElement) {
        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    handlePasswordValidationResult(validatedPassword,passwordErrorElement) {
        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }
}
