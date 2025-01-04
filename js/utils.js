import { storage } from "./local-storage.js";


export function createSectionContainer(id, titleText) {
    const container = document.createElement("div");
    container.setAttribute("id", id);

    const title = document.createElement("h2");
    title.innerText = titleText;

    container.appendChild(title);
    return container;
};

export function createParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    return paragraph;
}

export function createNavItem(href, text) {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = href;
    link.innerText = text;

    li.appendChild(link);

    return li
};

export function getFlatsByIds(flatIds){

    const flats = storage.get("flats");
    
    const filteredFlats = flats.filter(flat => flatIds.includes(flat.flatId));

    return filteredFlats
};
