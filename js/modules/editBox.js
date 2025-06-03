import { errorInputSettings, resetInputSettings } from './inputSettings.js';

export function editBox(todoItemElement, saveItemInLS) {
  // *** Select Elements ***
  const overlayEditBox = document.getElementById('overlay-edit-box');
  const closeButton = document.getElementById('close-button');
  const editInput = document.getElementById('edit-input');
  const saveButton = document.getElementById('save-btn');
  const cancelButton = document.getElementById('cancel-btn');
  // *** End of Select Elements ***

  // *** Add EditBox Overlay ***
  overlayEditBox.classList.add('active');
  // *** End of Add EditBox Overlay ***

  // *** Error Message + Reset Input 1500ms ***
  const ErrorMessageAndReset = (
    functionMessageValue,
    editInputValue = null
  ) => {
    const resetValueDelay = 1500;

    functionMessageValue();

    // *** Reset - 1500 ms ***
    setTimeout(() => {
      editInput.value = editInputValue;
      editInput.focus();
    }, resetValueDelay);
    // *** End of Reset - 1500 ms ***
  };
  // *** End of Error Message + Reset Input 1500ms ***

  // *** Original Todo Item Text ***
  const originalTodoItemText = todoItemElement.querySelector(
    '.todo__list-item-text'
  ).textContent;
  editInput.value = originalTodoItemText;
  editInput.focus();
  editInput.select();
  // *** End of Original Todo Item Text ***

  // *** Remove Edit Box Overlay & Listeners***
  const removeEditBoxOverlay = () => {
    overlayEditBox.classList.remove('active');

    closeButton.removeEventListener('click', closeBox);
    cancelButton.removeEventListener('click', closeBox);
    saveButton.removeEventListener('click', saveBox);
  };
  // *** End of Remove Edit Box Overlay & Listeners***

  // *** Close Box ***
  const closeBox = () => {
    resetInputSettings(editInput);

    removeEditBoxOverlay();
  };
  // *** End of Close Box ***

  // *** Save Box ***
  const saveBox = () => {
    const newValue = editInput.value.trim();

    // *** If is not value ***
    if (!newValue) {
      // *** Reset - 1500 ms ***
      ErrorMessageAndReset(
        () => errorInputSettings(editInput, "Can't be empty"),
        originalTodoItemText
      );
      // *** End of Reset - 1500 ms ***

      return;
    }
    // *** End of If is not value ***

    // *** isDuplicate Items ***
    const allItems = document.querySelectorAll('.todo__list-item-text');

    const isDuplicate = Array.from(allItems).some(oneItem => {
      // *** Own Text ***
      return (
        oneItem.textContent === newValue &&
        oneItem !== todoItemElement.querySelector('.todo__list-item-text')
      );
      // *** End of Own Text ***
    });

    // *** isDuplicate, Error Message, Reset 1500 ms ***
    if (isDuplicate) {
      ErrorMessageAndReset(() =>
        errorInputSettings(editInput, "Can't be duplicate")
      );

      return;
    }
    // *** End of isDuplicate, Error Message, Reset 1500 ms ***
    // *** End of isDuplicate Items ***

    // *** Update Todo Item Text ***
    todoItemElement.querySelector('.todo__list-item-text').textContent =
      newValue;

    if (typeof saveItemInLS === 'function') {
      saveItemInLS();
    }
    // *** End of Update Todo Item Text ***

    // *** Clear Input Value, Reset Input  & Remove Overlay ***
    editInput.value = '';
    resetInputSettings(editInput);
    removeEditBoxOverlay();
    // *** End of Clear Input Value, Reset Input  & Remove Overlay ***
  };
  // *** End of Save Box ***

  // *** Buttons and Event Listeners ***
  closeButton.addEventListener('click', closeBox);
  cancelButton.addEventListener('click', closeBox);
  saveButton.addEventListener('click', saveBox);
  // *** End of Buttons and Event Listeners ***
}
