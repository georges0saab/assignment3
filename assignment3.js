let tasks = loadTasks();

const tasklist = document.getElementById('task_list');// la yzidon bi id task_list taba3  html
const task_input = document.getElementById('task_input');
const taskForm = document.querySelector('.add_task form');
const emptyMessage = document.getElementById('empty_message');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));// localStorage biyekhud string so JSON convert the array to string 
}

//load el array tasks li huwe msayav bel localstorage 
function loadTasks() {
  try {                                                  
    const parsed = JSON.parse(localStorage.getItem('tasks'));
    return Array.isArray(parsed) ? parsed : [];          
  } catch (error) {                                      
    return [];
  }
}


function getNextId() { // date fiyo yi kun zeit el shi for 2 
  return tasks.reduce((max, task) => (task.id > max ? task.id : max), 0) + 1;
}

function renderTasks() {
  tasklist.innerHTML = "";

  tasks.forEach(task => {
    const list = document.createElement('li'); // ie <li>
    list.textContent = task.text;
    list.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('toggle'); // in html class="toggle "
    checkbox.setAttribute('aria-label', 'Mark task as completed');
    list.prepend(checkbox);

    if (task.completed) {
      list.classList.add("completed");
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete'); // html: <button class="delete"> delete </button>
    list.append(deleteBtn);

    tasklist.append(list);
  });

  emptyMessage.hidden = tasks.length > 0;
}

function addTask() {
  const text = task_input.value.trim(); // trim to remove any blank space abla aw ba3da,

  if (text === '') {
    alert('Task cannot be empty!');
    return;
  } //check if my text is empty

  const task = {// create the element of the array task
    id: getNextId(),        // was Date.now(). Now a unique id from getNextId()
    text: text,
    completed: false
  };
  tasks.push(task);//added it to my list of task in the array
  saveTasks();
  task_input.value = ''; //clear the textarea back to empty
  renderTasks();// re-erase everything inside so we dont duplicate when we add a new one the old elemnets
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) return;   // guard. find returns undefined when no task matches, and the next line would crash
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

tasklist.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.closest('.delete')) {
    deleteTask(id);
    return;
  }

  toggleTask(id);
});

renderTasks();