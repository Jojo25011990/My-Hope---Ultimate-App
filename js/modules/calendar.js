// *** Formating: Year, Month, Day and return whole string : 0000-00-00 ***
export function formatDateToLocalIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// *** End of Formating: Year, Month, Day and return whole string : 0000-00-00 ***

// *** Calendar ***
export function calendar(selectCurrentDateDay) {
  // *** Select Current Day, for linking with localStorage ( Todo List ) ***
  let selectedDate = null;

  function getSelectedDate() {
    return selectedDate;
  }

  function setSelectedDate(date) {
    selectedDate = date;
    if (selectCurrentDateDay) {
      selectCurrentDateDay(date);
    }
  }
  // *** End of Select Current Day, for prepojenie with localStorage ( Todo List ) ***

  // *** Initializing date ***
  const date = new Date();
  // *** End of Initializing date ***

  // *** Render Calendar ***
  function renderCalendar() {
    // *** Select Elements ***
    const headingMonthEl = document.getElementById('heading-month');
    const fullDateEl = document.getElementById('full-date');
    const daysEl = document.getElementById('days');
    // *** End of Select Elements ***

    // *** First Day, Last Day, Prev Last Day & Months ***
    const firstDay =
      (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    // *** End of First Day, Last Day, Prev Last Day & Months ***

    // *** Visual Date: Month, Full Date, Days  ***
    headingMonthEl.innerText = months[date.getMonth()];
    fullDateEl.innerText = date.toDateString();

    let days = '';

    for (let j = firstDay; j > 0; j--) {
      days += `<div class="calendar__downBox-day prev-day">${
        prevLastDay - j + 1
      }</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      const classes = ['calendar__downBox-day'];
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        classes.push('today');
      }
      days += `<div class="${classes.join(' ')}">${i}</div>`;
    }

    daysEl.innerHTML = days;
    // *** End of Visual Date: Month, Full Date, Days  ***
  }
  // *** End of Render Calendar ***

  // *** Handle Functions: Day click, Buttons Click left or right ***
  function handleDayClick(event) {
    const clickedEl = event.target;
    if (clickedEl.classList.contains('calendar__downBox-day')) {
      const allDays = document.querySelectorAll('.calendar__downBox-day');
      allDays.forEach(function (el) {
        el.classList.remove('selected');
      });
      clickedEl.classList.add('selected');

      const currentDay = Number(clickedEl.innerText);
      const clickedDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        currentDay
      );
      const formatted = formatDateToLocalIso(clickedDay);
      setSelectedDate(formatted);
    }
  }

  function handleBtnLeftClick() {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  }

  function handleBtnRightClick() {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  }
  // *** End of Handle Functions: Day click, Buttons Click left or right ***

  renderCalendar();

  const todayFormatted = formatDateToLocalIso(date);
  setSelectedDate(todayFormatted);

  const daysEl = document.getElementById('days');
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');

  // *** Event Listeners ***
  daysEl.addEventListener('click', handleDayClick);
  btnLeft.addEventListener('click', handleBtnLeftClick);
  btnRight.addEventListener('click', handleBtnRightClick);
  // *** End of Event Listeners ***

  // *** Return Functions ***
  return {
    getSelectedDate,
    setSelectedDate,
  };
  // *** End of Return Functions ***
}
// *** End of Calendar ***
