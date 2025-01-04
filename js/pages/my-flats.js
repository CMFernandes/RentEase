import { storage } from "../local-storage.js"
import { displayFlats } from "../display-flats.js";
import { getFlatsByIds,createSectionContainer} from "../utils.js";
import { renderHeader } from "../header.js";


document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    
    const myFlatsContainer = createSectionContainer("my-flats-container", "My Flats")
    document.body.appendChild(myFlatsContainer);
    
    const currentUser = storage.get("currentUser");
    const userFlats = currentUser["userFlats"];
   
    const flatsToDisplay = getFlatsByIds(userFlats);

    displayFlats(flatsToDisplay, "my-flats-container");
});
    