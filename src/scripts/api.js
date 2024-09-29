const PATH = "https://nomoreparties.co/v1/wff-cohort-23";
const AUTH_TOKEN = "d4ecec0a-dd8c-4dd9-8d53-afee648696a4";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(PATH + "/cards", {
    method: "GET",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при загрузке карточек: ", err);
    });
};

export const getUserData = () => {
  return fetch(PATH + "/users/me", {
    method: "GET",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при загрузке данных пользователя: ", err);
    });
};

export const patchUser = (name, about) => {
  return fetch(PATH + "/users/me", {
    method: "PATCH",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при обновлении профиля: ", err);
    });
};

export const addNewCard = (cardData) => {
  return fetch(PATH + "/cards", {
    method: "POST",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при добавлении карточки: ", err);
    });
};

export const countLikes = () => {
  return fetch(PATH + "/cards", {
    method: "GET",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при подсчете лайков: ", err);
    });
};

export const deleteCardFetch = (cardId) => {
  return fetch(PATH + `/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при удалении карточки: ", err);
    });
};

export const likeCardFetch = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при постановке лайка: ", err);
    });
};

export const dislikeCardFetch = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при снятии лайка: ", err);
    });
};

export const updateAvatar = (avatarUrl) => {
  return fetch(PATH + "/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarUrl }),
  })
    .then(handleResponse)
    .catch((err) => {
      console.log("Ошибка при обновлении аватара: ", err);
    });
};
