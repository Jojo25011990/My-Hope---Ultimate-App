// *** Use Strict Mode, Init Function, Import Modules ***
'use strict';

import { sectionThreejsText } from './modules/section01.js';
import { sectionGsapDescription } from './modules/section02.js';
import { sectionLoginForm } from './modules/section03.js';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  const threejsTextSection = sectionThreejsText();

  const delayTime = 10;

  gsap.delayedCall(delayTime, () => {
    const section02GsapTimeline = sectionGsapDescription();

    section02GsapTimeline.eventCallback('onComplete', () => {
      threejsTextSection.stopAnimation();

      sectionLoginForm();
    });
  });
}
// *** End of Use Strict Mode, Init Function, Import Modules ***
