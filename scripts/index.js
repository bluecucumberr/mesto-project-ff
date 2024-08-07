import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard (cardData, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link; 
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); 

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    }); 
    
    return cardElement;
}

initialCards.forEach(function(item) {
    const cardElement = createCard(item, deleteCard);
    cardList.append(cardElement);
})

function deleteCard(element) {
    element.target.closest('.card').remove(); 
}