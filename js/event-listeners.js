import { addFlatToUserCollection,removeFlatFromUserCollection,saveUser,saveFlat } from "./local-storage.js";
import { updateFlatUI } from "./flat-cards-ui.js";
import { handleLogin } from "./auth.js";
import { createModal,createCloseButton,createFlatDetailsContainer,createImageContainer } from "./flat-cards-ui.js";


export function handleLoginButton() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    handleLogin(email, password, "dynamic-form");
};


export function handleFavouriteButton(flatId,favouriteButton,favouriteIcon){
    const FAVOURITE_FLAT_STORAGE_KEY = "favouriteFlats";
    const FAVOURITE_FLATS_CONTAINER = "favourite-flats-container";
    const ALL_FLATS_CONTAINERS = "all-flats-container";

    const isFavourite = favouriteButton.getAttribute("data-favourite") === "true";
    favouriteButton.setAttribute("data-favourite", !isFavourite);

    if(!isFavourite){
        favouriteIcon.src = "../images/icons/colored-heart.png";
        favouriteIcon.alt = 'Remove from Favorites';
        addFlatToUserCollection(flatId, FAVOURITE_FLAT_STORAGE_KEY);
    }else {
        favouriteIcon.src = "../images/icons/empty-heart.png";
        favouriteIcon.alt = 'Add to Favorites';
        removeFlatFromUserCollection(flatId,  FAVOURITE_FLAT_STORAGE_KEY);
    }
    
    if (document.getElementById(FAVOURITE_FLATS_CONTAINER)) {
        updateFlatUI(FAVOURITE_FLATS_CONTAINER);
    }
    if (document.getElementById(ALL_FLATS_CONTAINERS)) {
        updateFlatUI(ALL_FLATS_CONTAINERS);
    }
};

export function handleCloseDetailsModal(modal){
    modal.remove();
    document.body.children[1].classList.remove("blur");
};

export function handleProfileUpdate(currentUser){
    console.log("inside handle")

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.birthDate = birthDate;
    currentUser.email = email;
    currentUser.password = password;


    window.location.href = "./index.html";
};

export function handleUserRegistration(){
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userFlats = [];
    const favouriteFlats = [];

    const userId = uuidv4();

    const user = {firstName,lastName,birthDate,email,password,userFlats,favouriteFlats,userId};

    saveUser(user);

    window.location.href = "./login.html";
};


export function showFlatDetails(flat){
    const flatModal = createModal();
    flatModal.setAttribute("class", "flat-modal hidden");

    
    const flatModalContent = document.createElement("div");
    flatModalContent.setAttribute("class", "flat-modal-content");
    
    const flatImgContainer = createImageContainer(flat.img);
    const flatDetailsContainer = createFlatDetailsContainer(flat);

    const closeModalButton = createCloseButton(() => handleCloseDetailsModal(flatModal));
    
    flatDetailsContainer.appendChild(closeModalButton);

    flatModalContent.appendChild(flatImgContainer);
    flatModalContent.appendChild(flatDetailsContainer);


    flatModal.appendChild(flatModalContent);
    document.body.appendChild(flatModal);

    document.body.children[1].classList.add("blur");
};

export function handleAddFlat(){
    const fileInput = document.getElementById("imgSrc").files[0];
        
    const reader = new FileReader();

    reader.onloadend = function() {
        const img = reader.result; 
        
        const city = document.getElementById("city").value;
        const streetName = document.getElementById("street-name").value;
        const streetNumber = document.getElementById("street-number").value;
        const areaSize = document.getElementById("area-size").value;
        const hasAC = document.getElementById("hasAC").checked;
        const yearBuilt = document.getElementById("year-built").value;
        const rentPrice = document.getElementById("rent-price").value;
        const dateAvailable = document.getElementById("date-available").value;

        const flatId = uuidv4();

        const flat = {
                    img,
                    city,
                    streetName,
                    streetNumber,
                    areaSize,
                    hasAC,
                    yearBuilt,
                    rentPrice,
                    dateAvailable,
                    flatId
                };    
    
        saveFlat(flat);
            
        addFlatToUserCollection(flatId, "userFlats"); 

        window.location.href = "./my-flats.html";
        }

    reader.readAsDataURL(fileInput)
}
