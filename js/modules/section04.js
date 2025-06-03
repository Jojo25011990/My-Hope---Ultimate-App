import { myGirlThreejs } from './girlThreejs.js';
import { errorInputSettings, resetInputSettings } from './inputSettings.js';
import { editBox } from './editBox.js';
import { confirmBox } from './confirmBox.js';
import { lightBox } from './lightBox.js';

import { alarmClock } from './alarmClock.js';
import { digitalClock } from './digitalClock.js';

import { calendar, formatDateToLocalIso } from './calendar.js';

export function sectionTodoApp() {
  // *** Select & Initializing Elements  ***
  const section04 = document.querySelector('.section-04');

  const todoForm = document.getElementById('todo-form');
  const todoClearBtn = document.getElementById('todo-clear-btn');
  const todoList = document.getElementById('todo-list');
  const todoInput = document.getElementById('todo-input');

  const todoListCompletedTask = document.getElementById('completed');
  const todoListUncompletedTask = document.getElementById('uncompleted');

  let myCalendar = null;

  let draggedTodoItem = null;
  // *** End of Select & Initializing Elements  ***

  // *** Initializing Completed & Uncompleted Tasks ***
  todoListCompletedTask.textContent = 0;
  todoListUncompletedTask.textContent = 0;
  // *** End of Initializing Completed & Uncompleted Tasks ***

  // *** GSAP Animation ***
  gsap.to(section04, { autoAlpha: 1, duration: 1, zIndex: 999 });
  // *** End of GSAP Animation ***

  // *** Update Counter Task ***
  function updateCounterTask() {
    const todoItems = document.querySelectorAll('.todo__list-item');
    const completed = [...todoItems].filter(todoItem =>
      todoItem.classList.contains('completed')
    ).length;
    const uncompleted = todoItems.length - completed;

    todoListCompletedTask.innerText = completed;
    todoListUncompletedTask.innerText = uncompleted;
  }
  // *** End of Update Counter Task ***

  // *** Set Todo Items Local Storage ***
  function setTodoItemLs() {
    if (!myCalendar) return;

    const todoItems = document.querySelectorAll('.todo__list-item');
    const currentDate = formatDateToLocalIso(
      new Date(myCalendar.getSelectedDate())
    );

    const allTasks = JSON.parse(localStorage.getItem('Todo List')) || [];

    const updateTaskForDate = Array.from(todoItems).map(todoItem => ({
      text: todoItem.querySelector('.todo__list-item-text').textContent,
      completed: todoItem.classList.contains('completed'),
      date: currentDate,
    }));

    const otherTasks = allTasks.filter(oneTask => oneTask.date !== currentDate);

    const newAllTasks = otherTasks.concat(updateTaskForDate);

    localStorage.setItem('Todo List', JSON.stringify(newAllTasks));
  }
  // *** End of Set Todo Items Local Storage ***

  // *** Handle Current Day Function ***
  function handleSelectCurrentDateDay(date) {
    todoList.innerText = '';

    const savedItems = JSON.parse(localStorage.getItem('Todo List')) || [];
    const filteredItems = savedItems.filter(
      savedItem => savedItem.date === date
    );

    filteredItems.forEach(filteredItem => {
      addTodoTask(filteredItem.text, filteredItem.completed, filteredItem.date);
    });

    updateCounterTask();
  }
  // *** End of Handle Current Day Function ***

  // *** Drag n Drop Functions ***
  // *** Drag Start ***
  function dragStartHandler(e) {
    draggedTodoItem = e.currentTarget;

    setTimeout(() => draggedTodoItem.classList.add('hidden'), 0);

    e.dataTransfer.effectAllowed = 'move';
  }
  // *** End of Drag Start ***

  // *** Drag Over ***
  function dragOverHandler(e) {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';

    e.currentTarget.classList.add('drag-over');
  }
  // *** End of Drag Over ***

  // *** Drag Drop ***
  function dragDropHandler(e) {
    e.preventDefault();

    if (draggedTodoItem !== e.currentTarget) {
      const list = e.currentTarget.parentNode;

      list.insertBefore(draggedTodoItem, e.currentTarget.nextSibling);

      setTodoItemLs();

      updateCounterTask();
    }
  }
  // *** End of Drag Drop ***

  // *** Drag End ***
  function dragEndHandler(e) {
    e.preventDefault();

    if (draggedTodoItem) draggedTodoItem.classList.remove('hidden');

    document
      .querySelectorAll('.todo__list-item')
      .forEach(todoItem => todoItem.classList.remove('drag-over'));
  }
  // *** End of Drag End ***

  // *** End of Drag n Drop Functions ***

  // *** Trash Button ***
  function trashBtn() {
    const btn = document.createElement('button');
    btn.className = 'todo__list-item-icons-btn';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash-can-arrow-up';
    btn.appendChild(icon);

    btn.addEventListener('click', async function (e) {
      e.stopPropagation();

      const result = await confirmBox();

      if (result) {
        btn.closest('.todo__list-item').remove();

        updateCounterTask();
        setTodoItemLs();
      }
    });

    return btn;
  }
  // *** End of Trash Button ***

  // *** Edit Button ***
  function editBtn(todoItemElement) {
    const btn = document.createElement('button');
    btn.className = 'todo__list-item-icons-btn';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-pen-to-square';
    btn.appendChild(icon);

    icon.addEventListener('click', e => {
      e.stopPropagation();

      editBox(todoItemElement, setTodoItemLs);
    });

    return btn;
  }
  // *** End of Edit Button ***

  // *** Add Todo Task ***
  function addTodoTask(text, completed, date) {
    // *** If text, completed, date are Undefined ***
    if (typeof text === 'undefined') text = todoInput.value.trim();
    if (typeof completed === 'undefined') completed = false;

    if (typeof date === 'undefined') {
      if (!myCalendar) return;

      date = formatDateToLocalIso(new Date(myCalendar.getSelectedDate()));
    }
    // *** End of If text, completed, date are Undefined ***

    // *** Reset Delay, Equal Input Value ***
    const resetDelay = 1500;
    const inputValue = text;
    // *** End of Reset Delay, Equal Input Value ***

    // *** If not Input Value, do any 😂 ***
    if (!inputValue) {
      errorInputSettings(todoInput, "Can't be empty");

      setTimeout(() => {
        resetInputSettings(todoInput);

        todoInput.focus();
      }, resetDelay);
      return;
    }
    // *** End of If not Input Value, do any 😂 ***

    // *** Is Duplicate, do any again 😂 ***
    const isDuplicate = Array.from(todoList.children).some(
      todoItem =>
        todoItem.querySelector('.todo__list-item-text').textContent ===
        inputValue
    );

    if (isDuplicate) {
      errorInputSettings(todoInput, "Can't be Duplicate");

      setTimeout(() => {
        resetInputSettings(todoInput);
        todoInput.focus();
      }, resetDelay);
      return;
    }
    // *** End of Is Duplicate, do any again 😂 ***

    // *** Create Li Element, set settings ( class name, attribute, dataset, etc..) ***
    const li = document.createElement('li');
    li.className = 'todo__list-item';
    li.setAttribute('draggable', true);
    li.dataset.date = date;

    if (completed) li.classList.add('completed');
    // *** End of Create Li Element, set settings ( class name, attribute, dataset, etc..) ***

    // *** Event Listener Drag n Drop, Class Toggle ***
    li.addEventListener('dragstart', dragStartHandler);
    li.addEventListener('dragover', dragOverHandler);
    li.addEventListener('drop', dragDropHandler);
    li.addEventListener('dragend', dragEndHandler);

    li.addEventListener('click', () => {
      li.classList.toggle('completed');

      setTodoItemLs();
      updateCounterTask();
    });
    // *** End of Event Listener Drag n Drop, Class Toggle ***

    // *** Create Elements, Append Elements, Set and Update Local Storage, Clear Todo Input = empty string ***
    const textSpan = document.createElement('span');
    textSpan.className = 'todo__list-item-text';
    textSpan.textContent = inputValue;

    const icons = document.createElement('div');
    icons.className = 'todo__list-item-icons';

    icons.appendChild(editBtn(li));
    icons.appendChild(trashBtn());

    li.appendChild(textSpan);
    li.appendChild(icons);
    todoList.appendChild(li);

    setTodoItemLs();
    updateCounterTask();

    todoInput.value = '';
    // *** End of Create Element, Append Elements, Set and Update Local Storage, Clear Todo Input = empty string ***
  }
  // *** End of Add Todo Task ***

  // *** Clear All Tasks ***
  function clearAllTasks() {
    if (!myCalendar) return;

    const currentDate = formatDateToLocalIso(
      new Date(myCalendar.getSelectedDate())
    );

    const allTasks = JSON.parse(localStorage.getItem('Todo List')) || [];

    const otherTasks = allTasks.filter(oneTask => oneTask.date !== currentDate);

    localStorage.setItem('Todo List', JSON.stringify(otherTasks));

    todoList.innerHTML = '';

    updateCounterTask();
  }
  // *** End of Clear All Tasks ***

  // *** Event Listeners, Todo Form & Todo Clear Button ***
  todoForm.addEventListener('submit', e => {
    e.preventDefault();

    addTodoTask();
  });

  todoClearBtn.addEventListener('click', clearAllTasks);
  // *** End of Event Listeners, Todo Form & Todo Clear Button ***

  // *** Initializing Calendar ***
  myCalendar = calendar(handleSelectCurrentDateDay);
  // *** End of Initializing Calendar ***

  // *** Calling Functions ***
  callFeatures();

  function callFeatures() {
    updateCounterTask();
    myGirlThreejs();
    alarmClock();
    lightBox();
  }
  // *** End of Calling Functions ***

  // *** Digital Clock - Mobile & Tablet Version ***
  let isDigitalClockRunning = false;

  function initDigitalClockIfNeeded() {
    if (window.innerWidth < 700 && !isDigitalClockRunning) {
      digitalClock();
      isDigitalClockRunning = true;
    }
  }

  initDigitalClockIfNeeded();

  window.addEventListener('resize', initDigitalClockIfNeeded);
  // *** End of Digital Clock - Mobile & Tablet Version ***
}
