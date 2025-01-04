export const storage = {
    get(key, defaultValue = [] ) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export function saveUser(user){
    const users = storage.get("users");

    users.push(user);

    storage.set("users", users);
};

export function saveFlat(flat){
    const flats = storage.get("flats");

    flats.push(flat);

    storage.set("flats", flats);
};


export function addFlatToUserCollection(flatId, storageKey){
    const currentUser = storage.get("currentUser");

    currentUser[storageKey].push(flatId);

    storage.set("currentUser", currentUser);

    updateUser(currentUser);
};

export function removeFlatFromUserCollection(flatId, storageKey){
    const currentUser = storage.get("currentUser");

    currentUser[storageKey] = currentUser[storageKey].filter(flat => flat !== flatId);

    storage.set("currentUser", currentUser)
    
    updateUser(currentUser);

};

function updateUser(currentUser){
    const users = storage.get("users");

    const userIndex = users.findIndex(user => user.userId === currentUser.userId);

    users[userIndex] = currentUser;

    storage.set("users", users);
};