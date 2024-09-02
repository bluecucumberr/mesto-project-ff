import {nameInput, jobInput, nameDisplay, descriptionDisplay} from './index.js'
import {placeInput, urlCardInput, cardsContainer, formAddElement} from './index.js'
import {createCard, deleteCard, likeCard} from './cards.js'

export function openModal(popupElement, preFill) {
    if (typeof preFill === 'function') {
        preFill();
    }  
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
}

export function preFill() {
    nameInput.value = nameDisplay.textContent;
    jobInput.value = descriptionDisplay.textContent;
}

export function closeModal(popupElement) {
    popupElement = document.querySelector('.popup_is-opened');
    if (popupElement) {
        popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscKey);
    }
}

export function defineAndCloseOpenedPopup () {
    const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
                closeModal(openedPopup);
            }
}

export function handleEscKey(event) {
    if(event.key === "Escape") {
        defineAndCloseOpenedPopup ();
    }
}

export function handleFormSubmit(event) {
    event.preventDefault();

    const newName = nameInput.value;
    const newDescription = jobInput.value;
    nameDisplay.textContent = newName;
    descriptionDisplay.textContent = newDescription;

    defineAndCloseOpenedPopup ();
}

export function handleFormAddSubmit(event) {
    event.preventDefault();

    const cardTitle = placeInput.value;
    const cardImgUrl = urlCardInput.value;

    const cardData = { name: cardTitle, link: cardImgUrl };
    const cardElement = createCard(cardData, deleteCard, likeCard);
    cardsContainer.prepend(cardElement);
    formAddElement.reset();     

    defineAndCloseOpenedPopup ();
}

