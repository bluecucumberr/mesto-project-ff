export const clearValidation = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass,
    inactiveButtonClass,
  }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((formInput) => {
    toggleInputErrorClass(
      formElement,
      formInput,
      "",
      inputErrorClass,
      errorClass,
      false
    );
  });

  toggleSaveButton(inputList, buttonElement, inactiveButtonClass);
};

export const setButtonState = (button, text, isDisabled) => {
  button.textContent = text;
  button.disabled = isDisabled;
}

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleSaveButton(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValidInput(formElement, formInput, inputErrorClass, errorClass);
      toggleSaveButton(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const isValidInput = (formElement, formInput, inputErrorClass, errorClass) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  toggleInputErrorClass(
    formElement,
    formInput,
    formInput.validationMessage,
    inputErrorClass,
    errorClass,
    !formInput.validity.valid 
  );
};

export const toggleInputErrorClass = (
  formElement,
  formInput,
  errorMessage,
  inputErrorClass,
  errorClass,
  addError
) => {
  const formError = formElement.querySelector(`.${formInput.name}-input-error`);

  if (addError) {
    formInput.classList.add(inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
  } else {
    formInput.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    formError.textContent = "";
  }
};

const toggleSaveButton = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};
