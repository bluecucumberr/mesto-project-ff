export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, deleteCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg =  cardElement.querySelector('.card__image');

    cardImg.src = cardData.link; 
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); 
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImg.addEventListener('click', () => openImagePopup(cardImg.src, cardImg.alt));
    
    return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest('.card').remove(); 
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

