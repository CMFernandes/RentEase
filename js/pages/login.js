import { renderHeader } from "../header.js"
import { handleLoginButton } from "../event-listeners.js";
import { createSectionContainer } from "../utils.js";
import { generateForm } from "../form.js";

document.addEventListener("DOMContentLoaded",() => {
    renderHeader();

    const dynamicForm = createSectionContainer("dynamic-form", "Login")
    document.body.appendChild(dynamicForm);

    const formConfig = {
        inputs: [
            {
                id: "email",
                type: "email",
                placeholder: "Email",
                label: "Email",
            },
            {
                id: "password",
                type: "password",
                placeholder: "Password",
                label: "Password",
            }
        ],
        buttons: [
            {
                id: "login-btn",
                label: "Login",
                onclick: (event) => {
                    event.preventDefault();
                    handleLoginButton();
                }
            },
            {
                id: "register-btn",
                label: "Register",
                onclick: () => {
                    window.location.href = "./register.html"
                }
            }
        ]
    }

    generateForm("dynamic-form",formConfig)
})


