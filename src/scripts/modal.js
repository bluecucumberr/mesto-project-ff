export function openModal(popupElement, preFill) {
    if (typeof preFill === 'function') {
        preFill();
    }  
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOverlayClick);
}

export function closeModal(popupElement) {
    popupElement = document.querySelector('.popup_is-opened');
    if (popupElement) {
        popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('mousedown', handleOverlayClick);
    }
}

export function defineAndCloseOpenedPopup () {
    const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
                closeModal(openedPopup);
            }
}

function handleEscKey(event) {
    if (event.key === "Escape") {
        defineAndCloseOpenedPopup ();
    }
}

function handleOverlayClick (event) {
    if (event.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}
