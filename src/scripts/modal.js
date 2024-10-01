export function openModal(popupElement, preFill) {
  if (typeof preFill === "function") {
    preFill();
  }
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
  popupElement.addEventListener("mousedown", handleOverlayClick);
}

export function closeModal(popupElement) {
  if (popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscKey);
    popupElement.removeEventListener("mousedown", handleOverlayClick);
  }
}

function handleEscKey(event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closeModal(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
      closeModal(event.currentTarget);
    }
}
