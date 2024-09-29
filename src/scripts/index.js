import "/src/pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, defineAndCloseOpenedPopup } from "./modal.js";
import { setEventListeners } from "./validation.js";
import {
  getInitialCards,
  getUserData,
  patchUser,
  addNewCard,
  countLikes,
  deleteCardFetch,
  likeCardFetch,
  dislikeCardFetch,
  updateAvatar,
} from "./api.js";

// отображение данных профиля с сервера
document.addEventListener("DOMContentLoaded", () => {
  getUserData().then((userData) => {
    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    nameDisplay.textContent = userData.name;
    descriptionDisplay.textContent = userData.about;
    nameInput.value = userData.name;
    jobInput.value = userData.about;
  });
});

//вывод каторчек на экран
const cardsContainer = document.querySelector(".places__list");
Promise.all([getInitialCards(), getUserData()]).then(
  ([cardsData, userData]) => {
    const currentUserId = userData._id;

    cardsData.forEach((item) => {
      const cardElement = createCard(
        item,
        deleteCard,
        likeCard,
        openImagePopup,
        currentUserId,
        deleteCardFetch,
        likeCardFetch,
        dislikeCardFetch
      );
      cardsContainer.append(cardElement);
    });
  }
);

//попапы
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");

//кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");
const updateButton = document.querySelector(".profile__image");

//элементы для работы с формой
const formEditElement = document.forms["edit-profile"];
const formAddElement = document.forms["new-place"];
const formUpdateAvatarElenemt = document.forms["update-avatar"];

const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const nameDisplay = document.querySelector(".profile__title");
const descriptionDisplay = document.querySelector(".profile__description");

const placeInput = formAddElement.querySelector(".popup__input_type_card-name");
const urlCardInput = formAddElement.querySelector(".popup__input_type_url");

const urlAvatarInput = formUpdateAvatarElenemt.querySelector(
  ".popup__input_type_url"
);

//обработчики событий
editButton.addEventListener("click", () => {
  openModal(editPopup, preFill);
  clearValidation(editPopup, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
  });
});

addButton.addEventListener("click", () => {
  openModal(addPopup);
  clearValidation(addPopup, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
  });
  placeInput.value = "";
  urlCardInput.value = " ";
});

updateButton.addEventListener("click", () => {
  openModal(updateAvatarPopup);
  clearValidation(updateAvatarPopup, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
  });
  urlAvatarInput.value = "";
});


closePopupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  });
});

formEditElement.addEventListener("submit", handleProfileForm);
formAddElement.addEventListener("submit", handleFormAddSubmit);

//заполнение по умолчанию
function preFill() {
  nameInput.value = nameDisplay.textContent;
  jobInput.value = descriptionDisplay.textContent;
}

function preFillImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
}

//открытие попапа карточки
const popupImage = document.querySelector(".popup_type_image .popup__image");
const popupCaption = document.querySelector(
  ".popup_type_image .popup__caption"
);

function openImagePopup(imageSrc, imageAlt) {
  const popupElement = document.querySelector(".popup_type_image");
  function preFill() {
    preFillImagePopup(imageSrc, imageAlt);
  }
  openModal(popupElement, preFill);
}

//обработка кнопок "сохранить" в формах
function handleProfileForm(event) {
  event.preventDefault();

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  const saveButton = event.target.querySelector(".popup__button");
  setButtonState(saveButton, "Сохранение...", true);

  patchUser(newName, newDescription).then((data) => {
    nameDisplay.textContent = data.name;
    descriptionDisplay.textContent = data.about;

    setButtonState(saveButton, "Сохранить", false);

    defineAndCloseOpenedPopup();
  });
}

function handleFormAddSubmit(event) {
  event.preventDefault();

  const cardTitle = placeInput.value;
  const cardImgUrl = urlCardInput.value;

  const saveButton = event.target.querySelector(".popup__button");
  setButtonState(saveButton, "Сохранение...", true);

  const cardData = { name: cardTitle, link: cardImgUrl };
  addNewCard(cardData).then((data) => {
    const cardElement = createCard(data, deleteCard, likeCard, openImagePopup);
    cardsContainer.prepend(cardElement);
    formAddElement.reset();

    setButtonState(saveButton, "Сохранить", false);

    defineAndCloseOpenedPopup();
  });
}

formUpdateAvatarElenemt.addEventListener("submit", (event) => {
  event.preventDefault();

  const newAvatarUrl = urlAvatarInput.value;

  const saveButton = event.target.querySelector(".popup__button");
  setButtonState(saveButton, "Сохранение...", true);

  updateAvatar(newAvatarUrl).then((data) => {
    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${data.avatar})`;

    setButtonState(saveButton, "Сохранить", false);

    defineAndCloseOpenedPopup();
  });
});

function setButtonState(button, text, isDisabled) {
  button.textContent = text;
  button.disabled = isDisabled;
}

//Валидация форм
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

const clearValidation = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((formInput) => {
    const formError = formElement.querySelector(
      `.${formInput.name}-input-error`
    );
    formInput.classList.remove("popup__input_type_error");
    formError.textContent = "";
    formError.classList.remove("popup__input-error");
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
});

countLikes().then((data) => {
  const cards = document.querySelectorAll(".card");

  data.forEach((item) => {
    cards.forEach((card) => {
      if (card.getAttribute("data-id") === item._id) {
        const likeCounter = card.querySelector(".card__like-count");
        likeCounter.textContent = item.likes.length;
      }
    });
  });
});
