export function addFormSubmitEventListener(formElement, formValidationFn) {
  if (formElement) {
    formElement.addEventListener('submit', (event) => {
      if (!formValidationFn()) {
        event.preventDefault();
      }
    });
  }
}
