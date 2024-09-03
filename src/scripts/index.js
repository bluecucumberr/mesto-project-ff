import '/src/pages/index.css';  
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, defineAndCloseOpenedPopup } from './modal.js';

//вывод каторчек на экран
const cardsContainer = document.querySelector('.places__list');
initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, likeCard, openImagePopup);
    cardsContainer.append(cardElement);
});

//попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

//элементы для работы с формой
const formEditElement = document.forms['edit-profile'];
const formAddElement = document.forms['new-place'];

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_description');
const nameDisplay = document.querySelector('.profile__title');
const descriptionDisplay = document.querySelector('.profile__description');

const placeInput = formAddElement.querySelector('.popup__input_type_card-name');
const urlCardInput = formAddElement.querySelector('.popup__input_type_url');

//обработчики событий
editButton.addEventListener('click', () => {openModal(editPopup, preFill)});
addButton.addEventListener('click', () => {openModal(addPopup)});

closePopupButtons.forEach(button => { button.addEventListener('click', closeModal); });

formEditElement.addEventListener('submit', handleProfileForm); 
formAddElement.addEventListener('submit', handleFormAddSubmit); 

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
const popupImage = document.querySelector('.popup_type_image .popup__image');
const popupCaption = document.querySelector('.popup_type_image .popup__caption');

function openImagePopup(imageSrc, imageAlt) {
    const popupElement = document.querySelector('.popup_type_image');
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
    nameDisplay.textContent = newName;
    descriptionDisplay.textContent = newDescription;

    defineAndCloseOpenedPopup ();
}

function handleFormAddSubmit(event) {
    event.preventDefault();

    const cardTitle = placeInput.value;
    const cardImgUrl = urlCardInput.value;

    const cardData = { name: cardTitle, link: cardImgUrl };
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    cardsContainer.prepend(cardElement);
    formAddElement.reset();     

    defineAndCloseOpenedPopup ();
}
