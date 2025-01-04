import { createSectionContainer } from "../utils.js";
import { generateForm, validateForm } from "../form.js";
import { renderHeader } from "../header.js";
import { handleUserRegistration } from "../event-listeners.js";


document.addEventListener("DOMContentLoaded", () =>{
    renderHeader();

    const dynamicForm = createSectionContainer("dynamic-form", "Register")
    document.body.appendChild(dynamicForm);
    
    const  formConfig = {
        inputs: [
            {
                id: "first-name",
                type: "text",
                placeholder: "First Name",
                label: "First Name ",
                minLength: 2,
            },
            {
                id: "last-name",
                type: "text",
                placeholder: "Last Name",
                label: "Last Name ",
                minLength: 2,
            },
            {
                id: "birth-date",
                type: "date",
                label: "Birth Date ",
            },
            {
                id: "email",
                type: "email",
                placeholder: "Email",
                label: "Email ",
                pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            },
            {
                id: "password",
                type: "password",
                placeholder: "Password",
                label: "Password ",
                pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*.])[A-Za-z\\d!@#$%^&*.]{6,}$",
            },
        ],
        buttons: [
            {
                id: "register-btn",
                label: "Register",
                onclick: (event) => {
                    const isFormValid = validateForm("dynamic-form-content");
                    if(isFormValid){
                        event.preventDefault();
                        handleUserRegistration();
                    }else{
                        return
                    };
                                    
                } 
            },
        ]
    };

    generateForm("dynamic-form",formConfig);
});
        