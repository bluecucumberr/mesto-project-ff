import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard (cardData, deleteCard, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg =  cardElement.querySelector('.card__image');

    cardImg.src = cardData.link; 
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); 
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    
    return cardElement;
}

initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard, likeCard);
    cardsContainer.append(cardElement);
})

function deleteCard(evt) {
    evt.target.closest('.card').remove(); 
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}