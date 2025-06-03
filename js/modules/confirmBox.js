export function confirmBox() {
  // *** Select Elements ***
  const confirmOverlay = document.getElementById('confirm-overlay');
  const confirmBtnYes = document.getElementById('confirm-btn-yes');
  const confirmBtnNo = document.getElementById('confirm-btn-no');
  // *** End of Select Elements ***

  // *** Add Confirm Overlay ***
  confirmOverlay.classList.add('active');
  // *** End of Add Confirm Overlay ***

  // *** Promise Answer Yes OR No & Delete All ( listeners + Overlay) ***
  return new Promise(resolve => {
    // *** Answer Yes ***
    const answerYes = () => {
      resolve(true);
      removeAll();
    };
    // *** End of Answer Yes ***

    // *** Answer No ***
    const answerNo = () => {
      resolve(false);
      removeAll();
    };
    // *** End of Answer No ***

    // *** Remove All, Listeners + Overlay ***
    function removeAll() {
      confirmOverlay.classList.remove('active');
      confirmBtnYes.removeEventListener('click', answerYes);
      confirmBtnNo.removeEventListener('click', answerNo);
    }
    // *** End of Remove All, Listeners + Overlay ***

    // *** Buttons & Event Listeners ***
    confirmBtnYes.addEventListener('click', answerYes);
    confirmBtnNo.addEventListener('click', answerNo);
    // *** End of Buttons & Event Listeners ***
  });
  // *** End of Promise Answer Yes OR No & Delete All ( listeners + Overlay) ***
}
