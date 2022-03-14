import { SubmissionManager } from "./submission.manager.js";

export const submitUserData = () => {
    return async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const manager = new SubmissionManager();

        if (manager.isUserDataValid(email, password)) {
            await manager.loginUser(email, password);
        }
    }
};