import { createParagraph,getFlatsByIds } from "./utils.js";
import { storage } from "./local-storage.js";
import { handleFavouriteButton } from "./event-listeners.js";
import { displayFlats } from "./display-flats.js";
import { showFlatDetails } from "./event-listeners.js";

export function createFlatCard(flat){
    const flatCard = document.createElement("div");
    flatCard.setAttribute("class", "flat-card");
    flatCard.setAttribute("data-flat-id", flat.flatId);

    const imgContainer = createImageContainer(flat.img);

    const infoContainer = createFlatInfoContainer(flat);

    flatCard.appendChild(imgContainer);
    flatCard.appendChild(infoContainer);

    flatCard.addEventListener("click", () => showFlatDetails(flat));

    return flatCard;
};

export function createImageContainer(imgSrc) {
    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "flat-img-container");

    const flatImg = document.createElement("img");
    flatImg.src = imgSrc;
    imgContainer.appendChild(flatImg);

    return imgContainer;
};

function createFlatInfoContainer(flat){
    const infoContainer = document.createElement("div");
    infoContainer.setAttribute("class", "flat-info-container");

    const infoPara = document.createElement("div");

    infoPara.appendChild(createParagraph(flat.city));
    infoPara.appendChild(createParagraph(`Year of build: ${flat.yearBuilt}`));
    infoPara.appendChild(createParagraph(`${flat.areaSize} m²`));
    infoPara.appendChild(createParagraph(`${flat.rentPrice}$ month`));

    infoContainer.appendChild(infoPara);

    const favouriteButton = createFavouriteButton(flat);
    const favouriteButtonContainer = document.createElement("div");
    favouriteButtonContainer.appendChild(favouriteButton);

    infoContainer.appendChild(favouriteButtonContainer);

    return infoContainer;
};

function createFavouriteButton(flat) {
    const currentUser = storage.get("currentUser");

    const favouriteIcon = document.createElement("img");
    favouriteIcon.src = "../images/icons/empty-heart.png";
    favouriteIcon.alt = "Add to Favorites";

    const favouriteButton = document.createElement("button");
    favouriteButton.classList.add("favourite-btn");
    favouriteButton.appendChild(favouriteIcon);


    if(!currentUser) {
        favouriteButton.disabled = true;
        favouriteButton.title = "Please log in to add to favourites.";
    } else {
        const isFavourite =  currentUser.favouriteFlats.includes(flat.flatId); 

        favouriteIcon.src = isFavourite 
            ? "../images/icons/colored-heart.png" 
            : "../images/icons/empty-heart.png"
        ;

        favouriteIcon.alt = isFavourite 
            ? "Remove from Favorites" 
            : "Add to Favorites"
        ;

        favouriteButton.setAttribute("data-favourite", isFavourite.toString());
    
        favouriteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            handleFavouriteButton(flat.flatId, favouriteButton, favouriteIcon);
        });
    }
  
   
    return favouriteButton;
};

export function createModal(){
    const modal = document.createElement("div");
    modal.setAttribute("class", "flat-modal hidden");
    return modal;
};

export function createCloseButton(onClickHandler) {
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "close-button");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", onClickHandler);
    return closeButton;
};

export function createFlatDetailsContainer(flat) {
    const detailsContainer = document.createElement("div");
    detailsContainer.setAttribute("class", "flat-details-container");

    const cityInfo = document.createElement("h2");
    cityInfo.innerText = `${flat.city}`;
    detailsContainer.appendChild(cityInfo);

    detailsContainer.appendChild(createParagraph(`Street: ${flat.streetName}, ${flat.streetNumber}`))
    detailsContainer.appendChild(createParagraph(`Area: ${flat.areaSize} m²`));
    detailsContainer.appendChild(createParagraph(`Has AC: ${flat.hasAc ? "Yes" : "No"}`));
    detailsContainer.appendChild(createParagraph(`Year Built: ${flat.yearBuilt}`));
    detailsContainer.appendChild(createParagraph(`Price: $${flat.rentPrice} per month`));
    detailsContainer.appendChild(createParagraph(`Available From: ${flat.dateAvailable}`));

    return detailsContainer;
};

export function updateFlatUI(containerId){
    const currentUser = storage.get("currentUser");
    
    let flatsToDisplay;
  
    switch (containerId) {
        case "favourite-flats-container":
            const favouriteFlatsIds = currentUser.favouriteFlats;
            flatsToDisplay = getFlatsByIds(favouriteFlatsIds);
            break;
        
        case "all-flats-container":
            flatsToDisplay = storage.get("flats");
            break;
        };

    displayFlats(flatsToDisplay, containerId);
}