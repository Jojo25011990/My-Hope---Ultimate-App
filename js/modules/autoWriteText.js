export function autoWriteText() {
  // *** Select & Initializing Variables ***
  const questionAnswer = document.getElementById('question-answer');
  const sentences = ['Who is that person? ', "It's a beautiful girl. "];

  let indexLetter = 0;
  let indexSentence = 0;
  let currentSentence = [];
  let isDeleting = false;
  // *** End of Select & Initializing Variables ***

  // *** Auto Write Function ***
  autoWrite();

  function autoWrite() {
    questionAnswer.innerHTML =
      currentSentence.join('') + `<span class="animate-border">|</span>`;

    // *** Main IF Statement ***
    if (indexSentence <= sentences.length) {
      // *** Letter < Sentences ( index ) ***
      if (indexLetter < sentences[indexSentence].length && !isDeleting) {
        currentSentence.push(sentences[indexSentence][indexLetter]);
        indexLetter++;
      }
      // *** End of Letter < Sentences ( index ) ***

      // *** IsDeleting = true and letter > 0 ***
      if (isDeleting && indexLetter > 0) {
        currentSentence.pop();
        indexLetter--;
      }
      // *** End of IsDeleting = true and letter > 0 ***

      // *** Letter === sentences ( index ) and isDeleting = false ***
      if (indexLetter === sentences[indexSentence].length && !isDeleting) {
        isDeleting = true;

        const deletingDelay = 1500;

        setTimeout(autoWrite, deletingDelay);

        return;
      }
      // *** End of Letter === sentences ( index ) and isDeleting = false ***

      // *** Letter === 0, isDeleting = true ***
      if (indexLetter === 0 && isDeleting) {
        isDeleting = false;
        indexSentence++;

        // *** Repeat if you want this ***
        // if (indexSentence >= sentences.length) indexSentence = 0;
        // *** End of Repeat if you want this ***

        // *** If index Sentence > Sentences length, remove element and set IS = 0 ( prevent error in console ) ***
        if (indexSentence >= sentences.length) {
          questionAnswer.remove();
          indexSentence = 0;
        }
        // *** End of If index Sentence > Sentences length, remove element and set IS = 0 ( prevent error in console ) ***
      }
      // *** End of Letter === 0, isDeleting = true ***

      const delay = isDeleting ? 50 : 100;
      setTimeout(autoWrite, delay);
    }
    // *** Main IF Statement ***
  }
  // *** End of Auto Write Function ***
}
