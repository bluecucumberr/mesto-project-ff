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
  }).then(handleResponse);
};

export const getUserData = () => {
  return fetch(PATH + "/users/me", {
    method: "GET",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then(handleResponse);
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
  }).then(handleResponse);
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
  }).then(handleResponse);
};

export const deleteCardFetch = (cardId) => {
  return fetch(PATH + `/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then(handleResponse);
};

export const likeCardFetch = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then(handleResponse);
};

export const dislikeCardFetch = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: AUTH_TOKEN,
    },
  }).then(handleResponse);
};

export const updateAvatar = (avatarUrl) => {
  return fetch(PATH + "/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(handleResponse);
};
