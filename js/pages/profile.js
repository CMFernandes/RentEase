import { renderHeader } from "../header.js";
import { storage } from "../local-storage.js";
import { generateForm } from "../form.js";
import { createSectionContainer } from "../utils.js";
import { handleProfileUpdate } from "../event-listeners.js";


document.addEventListener("DOMContentLoaded", () => {
    renderHeader();

    const dynamicForm = createSectionContainer("dynamic-form", "Profile");
    document.body.appendChild(dynamicForm);
    
    const currentUser = storage.get("currentUser");

    const  formConfig = {
        inputs: [
            {
                id: "first-name",
                type: "text",
                placeholder: "First Name",
                label: "First Name ",
                validationKey: "name",
                value: currentUser.firstName,
            },
            {
                id: "last-name",
                type: "text",
                placeholder: "Last Name",
                label: "Last Name ",
                validationKey: "name",
                value: currentUser.lastName,
            },
            {
                id: "birth-date",
                type: "date",
                label: "Birth Date ",
                validationKey: "birthDate",
                value: currentUser.birthDate,
            },
            {
                id: "email",
                type: "email",
                placeholder: "Email",
                label: "Email ",
                validationKey: "email", 
                value: currentUser.email,
            },
            {
                id: "password",
                type: "password",
                placeholder: "Password",
                label: "Password ",
                validationKey: "password",
                value: currentUser.password,
            },
        ],
        validations: {
            email: {
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                errorMessage: "Please enter a valid email address."
            },
            password: {
                regex: /^(?=.*\d)(?=.*[\W_]).{6,}$/,  
                errorMessage: "Password must contain at least one number, one symbol, and be at least 6 characters long."
            },
            name: {
                regex: /^.{2,}$/,
                errorMessage: "Name must have at least 2 characters long."
            },
            birthDate: {
                regex: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 
                errorMessage: "Age must be between 18 and 120 years."
            }
        },
        buttons: [
            {
                id: "update-user-btn",
                label: "Save",
                onclick: (event) => {
                    event.preventDefault();
                    handleProfileUpdate(currentUser);
                }
            },
        ]
    };

    generateForm("dynamic-form",formConfig);
});


   