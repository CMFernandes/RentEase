import { displayFlats } from '../display-flats.js';
import { storage } from '../local-storage.js';
import { renderHeader } from '../header.js';  
import { createSectionContainer } from '../utils.js';


document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    
    const allFlatsContainer = createSectionContainer("all-flats-container", "Explore all Flats")
    document.body.appendChild(allFlatsContainer);

    const flats = storage.get("flats");
    displayFlats(flats, "all-flats-container");
});