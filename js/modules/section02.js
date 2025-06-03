export function sectionGsapDescription() {
  // *** Select Elements & Messages ***
  const section02 = document.querySelector('.section-02');
  const titleSpans = document.querySelectorAll('.title__span');
  const subTitleSpans = document.querySelectorAll('.sub-title__span');
  const descriptionItems = document.querySelectorAll('.description__item');

  const tl = gsap.timeline().delay(1.5);
  const tlText = gsap.timeline();

  const messages = [
    '- Todo App: create, read, update, delete & edit tasks',
    '- LocalStorage, EditBox, ConfirmBox integrated in Todo App',
    '- Functional Calendar linked to Todo List',
    '- Alarm Clock & other CSS Art with full functionality',
    '- LightBox for image (CSS Art) viewing & effects',
    '- CSS Art: Pencil, Clock, Calendar 🎨',
    '- Custom auto typing effect (like Typed.js) 😁',
    '- Tons of Animations & Effects (GSAP, transitions, Three.js)',
    '- Canvas Particles Animation (custom JS)',
    '- Three.js Particles & Text Animation (custom JS)',
    '- Fully Responsive Design with form validation included 🙂',
    '- Enjoy the vibes – made in my style ❤️😅',
    '- Tech Stack: HTML5, SCSS (BEM), Vanilla JS (OOP), Modules',
    '- Canvas, GSAP, Three.js, and my Head 🤯😅',
    '- And the result? Total exhaustion! 🤣',
  ];
  // *** End of Select Elements & Messages ***

  // *** Gsap Timeline Animations ***
  tlText
    .to(subTitleSpans, {
      duration: 0.6,
      autoAlpha: 1,
      stagger: 0.2,
      rotate: 0,
      x: 0,
      y: 0,
    })
    .to(titleSpans, {
      duration: 0.6,
      scale: 1,
      z: 0,
      stagger: 0.2,
    });

  descriptionItems.forEach((descriptionItem, index) => {
    tl.to(descriptionItem, {
      duration: 2,
      ease: 'none',
      text: messages[index],
    }).delay(2.5);
  });

  tl.to(section02, { autoAlpha: 0, duration: 1, delay: 2 }).set(section02, {
    zIndex: -50,
    display: 'none',
  });
  // *** End of Gsap Timeline Animations ***

  // *** Return  Timeline ***
  return tl;
  // *** End of Return  Timeline ***
}
