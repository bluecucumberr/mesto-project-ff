export const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
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
  
    if (!formInput.validity.valid) {
      addInputErrorClass(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
    } else {
      removeInputErrorClass(formElement, formInput, inputErrorClass, errorClass);
    }
  };
  
  const addInputErrorClass = (formElement, formInput, errorMessage, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${formInput.name}-input-error`);
    formInput.classList.add(inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
  };
  
  const removeInputErrorClass = (formElement, formInput, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${formInput.name}-input-error`);
    formInput.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    formError.textContent = "";
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