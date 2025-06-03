import { canvasTextParticles } from './canvasText.js';
import { sectionTodoApp } from './section04.js';

export function sectionLoginForm() {
  // *** Form ***
  // *** Select Elements ***
  const form = document.getElementById('form');

  const formParent = form.parentElement;
  const formParentDelay = 2200;

  const todoAppSection = sectionTodoApp;
  const todoAppSectionDelay = 2000;
  // *** End of Select Elements ***

  // *** Gsap Animation ***
  gsap.to(form, { autoAlpha: 1, scale: 1, duration: 1, delay: 3 });
  // *** End of Gsap Animation ***

  // *** Success Message ***
  const successMessage = input => {
    const controlForm = input.parentElement;

    controlForm.classList.add('success');
    controlForm.classList.remove('error');
  };
  // *** End of Success Message ***

  // *** Error Message ***
  const errorMessage = (input, message) => {
    const controlForm = input.parentElement;
    controlForm.classList.add('error');

    const errorMessage = controlForm.querySelector('.form__control-small');
    errorMessage.textContent = message;
  };
  // *** End of Error Message ***

  // *** Login App ***
  function loginApp(e) {
    e.preventDefault();

    let isEmailValid = false;
    let isPasswordValid = false;

    // *** Email ***
    const email = document.getElementById('email');
    const inputEmail = email.value.trim().toLowerCase();

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

    if (inputEmail === '' || !emailRegex.test(inputEmail)) {
      errorMessage(email, `${email.id} is not valid`);
    } else {
      successMessage(email);
      isEmailValid = true;
    }
    // *** End of Email ***

    // *** Password ***
    const password = document.getElementById('password');
    const inputPassword = password.value.trim().toLowerCase();

    const passwordHint = document.querySelector('.section-03__password');
    const passwordText = 'natalka123';

    if (inputPassword === '' || inputPassword !== passwordText) {
      errorMessage(password, `${password.id} is not valid`);
      passwordHint.style.display = 'block';

      setTimeout(() => {
        passwordHint.style.display = 'none';
      }, 1000);
    } else {
      successMessage(password);
      isPasswordValid = true;
    }
    // *** End of Password ***

    // *** Valid Email & Password ***
    if (isEmailValid && isPasswordValid) {
      setTimeout(() => {
        formParent.classList.add('active');
      }, formParentDelay);

      setTimeout(() => {
        todoAppSection();
      }, todoAppSectionDelay);
    }
    // *** End of Valid Email & Password ***
  }

  form.addEventListener('submit', loginApp);
  // *** End of Login App ***

  // *** Canvas Text Particles ***
  canvasTextParticles();
  // *** End of Canvas Text Particles ***

  // *** End of Form ***
}
