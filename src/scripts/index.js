import '/src/pages/index.css';  
import { initialCards, createCard, deleteCard, likeCard } from './cards.js';
import { openModal, preFill, closeModal, handleFormSubmit, handleFormAddSubmit} from './modal.js';

//вывод каторчек на экран
export const cardsContainer = document.querySelector('.places__list');
initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, likeCard, openImagePopup);
    cardsContainer.append(cardElement);
})

//попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close');

//элементы для работы с формой
const formEditElement = document.forms['edit-profile'];
export const formAddElement = document.forms['new-place'];

const nameInput = formEditElement.querySelector('.popup__input_type_name');
const jobInput = formEditElement.querySelector('.popup__input_type_description');
const nameDisplay = document.querySelector('.profile__title');
const descriptionDisplay = document.querySelector('.profile__description');

const placeInput = formAddElement.querySelector('.popup__input_type_card-name');
const urlCardInput = formAddElement.querySelector('.popup__input_type_url');

export {nameInput, jobInput, nameDisplay, descriptionDisplay};
export {placeInput, urlCardInput};

//обработчики событий
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
        
    }
});

editButton.addEventListener('click', () => {openModal(editPopup, preFill)});
addButton.addEventListener('click', () => {openModal(addPopup)});

closePopupButton.forEach(button => { button.addEventListener('click', closeModal); });

formEditElement.addEventListener('submit', handleFormSubmit); 
formAddElement.addEventListener('submit', handleFormAddSubmit); 

//открытие попапа карточки
function preFillImagePopup(imageSrc, imageAlt) {
    const popupImage = document.querySelector('.popup_type_image .popup__image');
    const popupCaption = document.querySelector('.popup_type_image .popup__caption');
  
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
  }
  
function openImagePopup(imageSrc, imageAlt) {
    const popupElement = document.querySelector('.popup_type_image');
    function preFill() {
        preFillImagePopup(imageSrc, imageAlt);
    }
    openModal(popupElement, preFill);
  }