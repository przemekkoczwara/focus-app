import './style.scss';

const form = document.querySelector('#todo-form');
const inputField = document.querySelector('#input-field');
const errorMsg = document.querySelector('#error-msg');

// Funkcja renderująca taski
function renderTasks() {
  const tasks = loadTasks(); // To jest tablica tasków jako obiektów
  const taskList = document.querySelector('#task-list');
  taskList.innerHTML = ''; // Wyczyść listę przed renderowaniem nowych zadań

  tasks.forEach(function (task) {
    const taskElement = document.createElement('li');
    taskElement.classList.add('list-item');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add('task-text');

    if (task.completed) {
      taskText.classList.add('completed');
    }

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('material-symbols-outlined', 'remove-task');
    removeBtn.textContent = 'delete';
    removeBtn.title = 'Remove-task';

    // Przy kliknięciu usuwamy zadanie z DOM i z localStorage
    removeBtn.addEventListener('click', function () {
      removeTasksFromStorage(task.id); // Usuwamy zadanie z localStorage
      renderTasks(); // Ponowne renderowanie po usunięciu
    });

    taskElement.append(taskText, removeBtn);
    taskList.append(taskElement);
  });
}

// Funkcja do obsługi formularza
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = inputField.value.trim();
  if (taskText === '') return showError('Please enter a new task !!!');

  addTask(taskText);
  inputField.value = '';
  errorMsg.hidden = true;
});

// Funkcja dodająca nowy task
function addTask(text) {
  const tasks = loadTasks();

  const newTask = {
    id: Date.now(), // Unikalny identyfikator na podstawie czasu
    text: text,
    completed: false,
  };
  tasks.push(newTask); // Dodanie nowego zadania do tablicy

  saveTasks(tasks); // Zapisanie tasków do localStorage
  renderTasks(); // Ponowne renderowanie listy
}

// Funkcja pokazująca błędy
function showError(msg) {
  const errorMsg = document.querySelector('#error-msg');
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
}

// Funkcja ładująca taski z localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [];
}

// Funkcja zapisująca taski do localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcja usuwająca task z localStorage
function removeTasksFromStorage(taskId) {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(function (task) {
    return task.id !== taskId; // Porównanie id zadania
  });
  saveTasks(updatedTasks); // Zapisz zaktualizowaną listę tasków
}

// Wywołanie renderTasks() na starcie strony
renderTasks(); // ← TERAZ jest wywołane po zdefiniowaniu funkcji
