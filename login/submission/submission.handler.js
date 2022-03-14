import { isUserDataValid } from "/utilities/validation/validateUserData.js";
import { loginUser } from "/utilities/dataSubmitting/login.js";

export const submitUserData = () => {
    return async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (isUserDataValid(email, password)) {
            await loginUser(email, password);
        }
    }
};