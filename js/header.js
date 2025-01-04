import { isUserLoggedIn,handleLogout } from "./auth.js";
import { storage } from "./local-storage.js";
import { createNavItem } from "./utils.js";

export function renderHeader(){
    const isLoggedIn = isUserLoggedIn();
    
    const header = document.getElementById("header");

    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logo = document.createElement("h3");
    logo.innerText = "RentEase";

    logoContainer.appendChild(logo);
    header.appendChild(logoContainer);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    if(isLoggedIn){
        const user = storage.get("currentUser");

        const userName = `${user.firstName}  ${user.lastName} !`;

        const greetingLi  = document.createElement("li");
        const greetingPara = document.createElement("p");
        greetingPara.innerText = `Hello, ${userName}`;

        const logoutBtn = document.createElement("button");
        logoutBtn.innerText = "Logout";
        logoutBtn.classList.add("logout-btn")
        logoutBtn.addEventListener("click",() => handleLogout());

        greetingLi.appendChild(greetingPara);
        ul.appendChild(greetingLi);
        
        ul.appendChild(createNavItem("./index.html", "Home"));
        ul.appendChild(createNavItem("./all-flats.html", "Flats"));
        ul.appendChild(createNavItem("./flat-form.html", "New flat +"));
        ul.appendChild(createNavItem("./my-flats.html", "My flats"));
        ul.appendChild(createNavItem("./profile.html", "Profile"));
        ul.appendChild(logoutBtn);

    } else {
        ul.appendChild(createNavItem("./index.html", "Home"));
        ul.appendChild(createNavItem("./all-flats.html", "Flats"));
        ul.appendChild(createNavItem("./register.html", "Register"));
        ul.appendChild(createNavItem("./login.html", "Login"));
    };

    nav.appendChild(ul);
    header.appendChild(nav);
};


