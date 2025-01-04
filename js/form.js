export function generateForm(formId, config) {
    const formContainer = document.getElementById(formId);

    let formElement = formContainer.querySelector('#dynamic-form-content');

    if (!formElement) {
        formElement = document.createElement("form");
        formElement.setAttribute("id", "dynamic-form-content");
        formContainer.appendChild(formElement);
    } else {
        formElement.innerHTML = "";
    };
   

    config.inputs.forEach(({ type = "text", id, placeholder = "", label,required = true,value = "",min,pattern, minLength}) => {
        const inputContainer = document.createElement("div");
        inputContainer.setAttribute("class", `input-container ${id}`);
        

        const inputLabel = document.createElement("label");
        inputLabel.innerText = label;

        const inputElement = document.createElement("input");
        inputElement.type = type;
        inputElement.id = id;
        inputElement.placeholder = placeholder;
        inputElement.value = value;


        if (required) inputElement.setAttribute("required", "required");
        if (min) inputElement.setAttribute("min", min);
        if (pattern) inputElement.setAttribute("pattern", pattern);
        if (minLength) inputElement.setAttribute("minlength", minLength);

        inputContainer.appendChild(inputLabel);
        inputContainer.appendChild(inputElement);
        
        formElement.appendChild(inputContainer);
    });


    config.buttons.forEach(({id, label,onclick}) => {
        const buttonElement = document.createElement("button");

        buttonElement.id = id;
        buttonElement.innerText = label;
        buttonElement.onclick = onclick;

        formElement.appendChild(buttonElement)
    });
};


export function validateForm(formId) {
    const form = document.getElementById(formId);

    validateAge(form);

    if (!form.checkValidity()) {
        showValidationErrors(form); 
        return false;
    };

    return true; 
};
            
        
function showValidationErrors(form){
    const invalidFields = Array.from(form.elements).filter(input => !input.checkValidity());
    
    invalidFields.forEach(inputElement => {
        const errorMessage = getValidationErrorMessage(inputElement);
        
        let errorSpan = inputElement.parentElement.querySelector(".error-span");
        
        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-span"); 
            inputElement.parentElement.appendChild(errorSpan);
        }
        
        errorSpan.innerText = errorMessage;
    });
    
    const validFields = Array.from(form.elements).filter(input => input.checkValidity());
    validFields.forEach(inputElement => {
        const errorSpan = inputElement.parentElement.querySelector(".error-span");
        if (errorSpan) {
            errorSpan.remove();
        };
    });
};


function getValidationErrorMessage(input) {
    if (input.validity.customError) {
        return input.validationMessage;
    };
    if (input.validity.valueMissing) {
        return "This field is required.";
    };
    if (input.validity.typeMismatch) {
        return `Please enter a valid ${input.type}.`;
    };
    if (input.validity.tooShort) {
        return `Please enter at least ${input.minLength} characters.`;
    };
    if (input.validity.rangeUnderflow) {
        return `Please enter a number greater than or equal to ${input.min}.`;
    };
    if (input.validity.patternMismatch) {
        if (input.type === "password") {
            return "Password must be 6 characters long, have at least one number, and one special character.";
        }
        return `Please match the requested format.`;
    };
    
};

function validateAge(form){
    const birthDateInput = form.querySelector("#birth-date");

    if(birthDateInput){
        const birthDate = new Date(birthDateInput.value);
        const age = calculateAge(birthDate);

        if (age < 18) {
           birthDateInput.setCustomValidity("You must be at least 18 years old.");
        } else if (age > 120) {
            birthDateInput.setCustomValidity("The age must be under 120 years old.");
        }else { 
            birthDateInput.setCustomValidity("");
        }
    }else{
        return;
    };
    
};

function calculateAge(birthDate) {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    };
    return age;
};