const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  deleteCard,
  likeCard,
  openImagePopup,
  currentUserId,
  deleteCardFetch,
  likeCardFetch,
  dislikeCardFetch
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");

  cardImg.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImg.alt = cardData.name;

  const likeCounter = cardElement.querySelector(".card__like-count");
  likeCounter.textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) =>
      deleteCard(evt, cardData._id, deleteCardFetch)
    );
  }

  const likeButton = cardElement.querySelector(".card__like-button");

  const hasUserLiked = cardData.likes.some(
    (user) => user._id === currentUserId
  );
  if (hasUserLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardData._id, likeCardFetch, dislikeCardFetch);
  });

  cardImg.addEventListener("click", () =>
    openImagePopup(cardImg.src, cardImg.alt)
  );

  return cardElement;
}

export function deleteCard(evt, cardId, deleteCardFetch) {
  const cardElement = evt.target.closest(".card");
  deleteCardFetch(cardId).then(() => {
    cardElement.remove();
  });
}

export function likeCard(evt, cardId, likeCardFetch, dislikeCardFetch) {
  const cardElement = evt.target.closest(".card");
  const likeButton = evt.target;
  const likeCounter = cardElement.querySelector(".card__like-count");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCardFetch(cardId).then((updatedCard) => {
      likeButton.classList.remove("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    });
  } else {
    likeCardFetch(cardId).then((updatedCard) => {
      likeButton.classList.add("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    });
  }
}

export function updateLikeCounts(data) {
  const cards = document.querySelectorAll(".card");

  data.forEach((item) => {
    const cardId = item._id;
    cards.forEach((card) => {
      const cardElement = card.closest(".card");
      if (cardElement && cardElement.cardId === cardId) {
        const likeCounter = card.querySelector(".card__like-count");
        likeCounter.textContent = item.likes.length;
      }
    });
  });
}