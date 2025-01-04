import { isUserLoggedIn } from "./auth.js";
import { createSectionContainer,getFlatsByIds} from "./utils.js";
import { storage } from "./local-storage.js";
import { displayFlats } from "./display-flats.js";

export function renderHomePage() {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
        renderLoggedInView();
    } else {
        renderGuestView();
    }
}

function renderLoggedInView() {
    const favouriteFlatsContainer = createSectionContainer("favourite-flats-container", "Favourite Flats");
    document.body.appendChild(favouriteFlatsContainer);

    const allFlatsContainer = createSectionContainer("all-flats-container", "Explore all Flats");
    document.body.appendChild(allFlatsContainer);

    const currentUser = storage.get("currentUser");
    const favouriteFlats = getFlatsByIds(currentUser["favouriteFlats"]);
    const allFlats = storage.get("flats");

    displayFlats(favouriteFlats, "favourite-flats-container");
    displayFlats(allFlats, "all-flats-container");
}

function renderGuestView() {
    const allFlatsContainer = createSectionContainer("all-flats-container", "Explore all Flats");
    document.body.appendChild(allFlatsContainer);

    const allFlats = storage.get("flats");
    displayFlats(allFlats, "all-flats-container");
}