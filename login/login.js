import { validateUserInput } from "./validate-handler.js";
import { submitUserData } from "../utilities/dataSubmitting/dataSubmitting.js";

const loginForm = document.getElementById('loginForm');

loginForm.onchange = validateUserInput(loginForm);
loginForm.onsubmit = submitUserData();