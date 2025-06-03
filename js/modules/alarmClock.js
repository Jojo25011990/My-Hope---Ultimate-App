export function alarmClock() {
  // *** Select Elements - Singular ***
  const hour = document.getElementById('hour');
  const minute = document.getElementById('minute');
  const second = document.getElementById('second');
  // *** End of Select Elements - Singular ***

  // *** Set Time ***
  const visualTime = () => {
    const date = new Date();

    // *** Get Hours, Minutes, Seconds - Plural ***
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // *** End of Get Hours, Minutes, Seconds - Plural ***

    // *** Actual Time ***
    const actualHours = (hours / 12) * 360;
    const actualMinutes = (minutes / 60) * 360;
    const actualSeconds = (seconds / 60) * 360;
    // *** End of Actual Time ***

    // *** Set Style Transform Property ***
    second.style.transform = `rotate(${actualSeconds}deg)`;
    minute.style.transform = `rotate(${actualMinutes}deg)`;
    hour.style.transform = `rotate(${actualHours}deg)`;
    // *** End of Set Style Transform Property ***
  };
  // *** End of Set Time ***

  setInterval(visualTime, 1000);
}
