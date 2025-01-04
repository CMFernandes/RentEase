import { storage } from "./local-storage.js";

export function handleLogin(email, password, formId){
    const users = storage.get("users");

    const user = users.find( u => {
        return u.email === email && u.password === password;
    });

    const existingError = document.getElementById("login-error");
        if (existingError) {
        existingError.remove();
    };
    
    if(user){
        storage.set("currentUser", user);
        window.location.href = "./index.html";
    } else {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        const loginErrorElement = document.createElement("span");
        loginErrorElement.id = "login-error";
        loginErrorElement.innerText = "* Invalid email or password";

        document.getElementById("password").parentElement.appendChild(loginErrorElement);
    };
};

export function handleLogout() {
    storage.set("currentUser", null);
    window.location.href = "./index.html"
};

export function isUserLoggedIn(){
    return storage.get("currentUser", null) ? true : false;
};