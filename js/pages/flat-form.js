import { handleAddFlat } from "../event-listeners.js";
import { generateForm } from "../form.js"; 
import { renderHeader } from "../header.js";
import { createSectionContainer } from "../utils.js";
import { validateForm } from "../form.js";

document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    
    const dynamicForm = createSectionContainer("flat-form", "Add Flat");
    document.body.appendChild(dynamicForm);
    
    const formConfig = {
        inputs: [
            {
                id: "imgSrc",
                type: "file",
                label: "Image file",
            },
            {
                id: "city",
                type: "text",
                placeholder: "Lisbon",
                label: "City: ",
            },
            {
                id: "street-name",
                type: "text",
                placeholder: "first street",
                label: "Street name: ",
            },
            {
                id: "street-number",
                type: "number",
                placeholder: "2",
                label: "Street number: ",
            },
            {
                id: "area-size",
                type: "number",
                placeholder: "100",
                label: "Area Size: ",
                min: 15,
            },
            {
                id: "year-built",
                type: "number",
                placeholder: "2022",
                label: "Built in: ",
            },
            {
                id: "rent-price",
                type: "number",
                placeholder: "1500",
                label: "Rent Price: ",
            },
            {
                id: "date-available",
                type: "date",
                label: "Date Available: ",
            },
            {
                id: "hasAC",
                type: "checkbox",
                label: "Has AC",
                required: false,
            },
        ],
        buttons: [
            {
                id: "add-flat-btn",
                label: "Add +",
                onclick: (event) => {
                    const isFormValid = validateForm("dynamic-form-content");
                    if(isFormValid){
                        event.preventDefault();
                        handleAddFlat();
                    }else{
                        return
                    };
                   
                },
            },
            {
                id: "cancel-btn",
                label: "Cancel",
                onclick: () => {
                    window.location.href = "./index.html";
                },
            },
        ],
    };

    generateForm("flat-form",formConfig);
});