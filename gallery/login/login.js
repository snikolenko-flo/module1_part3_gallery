import { validateUserInput } from "../../utilities/validation.js";
import { submitUserData } from "../../utilities/dataSubmitting.js";

const loginForm = document.getElementById('loginForm');

loginForm.onchange = validateUserInput(loginForm);
loginForm.onsubmit = submitUserData();