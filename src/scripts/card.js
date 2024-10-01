const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteCard, likeCard, openImagePopup, currentUserId, deleteCardFetch, likeCardFetch, dislikeCardFetch) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImg.src = cardData.link;  
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImg.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id, deleteCardFetch)
    );
  }

  const hasUserLiked = cardData.likes.some(
    (user) => user._id === currentUserId
  );
  if (hasUserLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(cardData._id,likeCardFetch, dislikeCardFetch, likeButton, likeCounter);
  });

  cardImg.addEventListener("click", () => openImagePopup(cardImg.src, cardImg.alt));

  return cardElement;
}

export function deleteCard(cardElement, cardId, deleteCardFetch) {
  deleteCardFetch(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateLikeCounter(likeCounterElement, likeCount) {
  likeCounterElement.textContent = likeCount;
}

function toggleLikeButton(likeButton, isLiked) {
  likeButton.classList.toggle("card__like-button_is-active", isLiked);
}

export function likeCard(cardId, likeCardFetch, dislikeCardFetch, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const fetchFunc = isLiked ? dislikeCardFetch : likeCardFetch;

  fetchFunc(cardId)
    .then((updatedCard) => {
      toggleLikeButton(likeButton, !isLiked);
      updateLikeCounter(likeCounter, updatedCard.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}
