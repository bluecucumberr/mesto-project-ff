import "/src/pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation, setButtonState } from "./validation.js";
import {
  getInitialCards,
  getUserData,
  patchUser,
  addNewCard,
  deleteCardFetch,
  likeCardFetch,
  dislikeCardFetch,
  updateAvatar,
} from "./api.js";

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};


let currentUserId;

const cardsContainer = document.querySelector(".places__list");

// отображение данных профиля и вывод карточек на экран
Promise.all([getInitialCards(), getUserData()])
  .then(([cardsData, userData]) => {
    currentUserId = userData._id;
    updateAvatarButton.style.backgroundImage = `url(${userData.avatar})`;

    nameDisplay.textContent = userData.name;
    descriptionDisplay.textContent = userData.about;

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
  })
  .catch((err) => {
    console.log(err);
  });

//попапы
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");
const popupImg = document.querySelector(".popup_type_image");

//кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");
const updateAvatarButton = document.querySelector(".profile__image");

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
  clearValidation(editPopup, validationSettings);
});

addButton.addEventListener("click", () => {
  openModal(addPopup);
  clearValidation(addPopup, validationSettings);
  placeInput.value = "";
  urlCardInput.value = " ";
});

updateAvatarButton.addEventListener("click", () => {
  openModal(updateAvatarPopup);
  clearValidation(updateAvatarPopup, validationSettings);
  urlAvatarInput.value = "";
});

closePopupButtons.forEach((button) => {
  const openedPopup = button.closest(".popup");
  button.addEventListener("click", () => {
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
  function preFill() {
    preFillImagePopup(imageSrc, imageAlt);
  }
  openModal(popupImg, preFill);
}

//обработка кнопок "сохранить" в формах
function handleProfileForm(event) {
  event.preventDefault();

  const newName = nameInput.value;
  const newDescription = jobInput.value;

  setButtonState(event.submitter, "Сохранение...", true);

  patchUser(newName, newDescription)
    .then((data) => {
      nameDisplay.textContent = data.name;
      descriptionDisplay.textContent = data.about;
      closeModal(editPopup);
    })
    .finally(() => {
      setButtonState(event.submitter, "Сохранить", false);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleFormAddSubmit(event) {
  event.preventDefault();

  const cardTitle = placeInput.value;
  const cardImgUrl = urlCardInput.value;

  setButtonState(event.submitter, "Сохранение...", true);

  const cardData = { name: cardTitle, link: cardImgUrl };
  addNewCard(cardData)
    .then((data) => {
      const cardElement = createCard(
        data,
        deleteCard,
        likeCard,
        openImagePopup,
        currentUserId,
        deleteCardFetch,
        likeCardFetch,
        dislikeCardFetch
      );
      cardsContainer.prepend(cardElement);
      formAddElement.reset();

      closeModal(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonState(event.submitter, "Сохранить", false);
    });
}

formUpdateAvatarElenemt.addEventListener("submit", (event) => {
  event.preventDefault();

  const newAvatarUrl = urlAvatarInput.value;

  setButtonState(event.submitter, "Сохранение...", true);

  updateAvatar(newAvatarUrl)
    .then((data) => {
      updateAvatarButton.style.backgroundImage = `url(${data.avatar})`;

      closeModal(addPopup)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonState(event.submitter, "Сохранить", false);
    });
});

//Валидация форм
enableValidation(validationSettings);
