export function digitalClock() {
  // *** Set Time ***
  function visualTime() {
    // *** Select Elements ***
    const digitalClock = document.getElementById('digital-clock');
    const date = new Date();
    // *** End of Select Elements ***

    // *** Get Hours, Minutes, Seconds ***
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    let seconds = String(date.getSeconds());
    // *** End of Get Hours, Minutes, Seconds ***

    // *** IF values is less than 2 digits, prepend a zero ***
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    // *** End of IF values is less than 2 digits, prepend a zero ***

    // *** Full Time ***
    let fullTime = `${hours} : ${minutes} : ${seconds}`;

    digitalClock.innerHTML = fullTime;
    // *** End of Full Time ***
  }
  // *** End of Set Time ***
  setInterval(visualTime, 1000);
}
