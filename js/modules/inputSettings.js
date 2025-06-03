// *** Input Error Message ***
export const errorInputSettings = (inputElement, placeholderMessage) => {
  inputElement.style.backgroundColor = '#d9534f';
  inputElement.placeholder = placeholderMessage;
};
// *** Input Error Message ***

// *** Reset Input, Placeholder Defualt Message Add Task  ***
export const resetInputSettings = (
  inputElement,
  placeholderMessage = 'Add Task'
) => {
  inputElement.style.backgroundColor = '#fff';
  inputElement.placeholder = placeholderMessage;
};
// *** End of Reset Input, Placeholder Defualt Message Add Task  ***
