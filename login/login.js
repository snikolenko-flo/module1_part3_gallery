import { validateUserInput } from "./validation/validation.handler.js";
import { submitUserData } from "./submission/submission.handler.js";

const loginForm = document.getElementById('loginForm');

loginForm.onchange = validateUserInput(loginForm);
loginForm.onsubmit = submitUserData();