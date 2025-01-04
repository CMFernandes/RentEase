import { createFlatCard } from "./flat-cards-ui.js";


export function displayFlats(flats,containerId) {
    const flatsContainer = document.getElementById(containerId);
    flatsContainer.classList.add("flats-container");

    let dynamicContainer = flatsContainer.querySelector('.dynamic-content');

    if (!dynamicContainer) {
        dynamicContainer = document.createElement("div");
        dynamicContainer.setAttribute("class", "dynamic-content");
        flatsContainer.appendChild(dynamicContainer);
    } else {
        dynamicContainer.innerHTML = "";
    }

    if(flats.length === 0) {
        const noFlatsPara = document.createElement("p");
        noFlatsPara.innerText = "There are no flats to display.";
        noFlatsPara.classList.add("no-flats-to-display");
       dynamicContainer.appendChild(noFlatsPara);
    } else {
        flats.forEach(flat => {
            const flatCard = createFlatCard(flat);
            dynamicContainer.appendChild(flatCard);
        });
    };
};


