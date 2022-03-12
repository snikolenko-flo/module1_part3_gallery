import { loginUser } from "./dataSubmitting/login.js";
import { isUserDataValid } from "./validation/validateUserData.js";

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