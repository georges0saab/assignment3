let tasks = loadTasks();

const tasklist = document.getElementById('task_list');// la yzidon bel html
const task_input = document.getElementById('task_input');
const taskForm = document.querySelector('.add_task form');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem('tasks');
  return JSON.parse(raw) || [];
}


function renderTasks() {
  tasklist.innerHTML = "";

  tasks.forEach(task => {
    const list = document.createElement('li');
    list.textContent = task.text;
    list.dataset.id = task.id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('toggle');
    checkbox.setAttribute('aria-label', 'Mark task as completed');
    list.prepend(checkbox);

    if (task.completed) {
    list.classList.add("completed");
}

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    list.append(deleteBtn);

    tasklist.append(list);
  });
}

function addTask() {
    const text = task_input.value.trim(); // trim to remove any blank space abla aw ba3da,
    
    if (text === '') {
    alert('Task cannot be empty!');
    return;
  } //check if my text is empty 
  
    const task = {// create the element of the array task 
    id: Date.now(),
    text: text,
    completed: false
  }; 
    tasks.push(task);//added it to my list of task in the array
    saveTasks();
    task_input.value = ''; //clear the textarea back to empty
    renderTasks();// re-erase everything inside so we dont duplicate when we add a new one the old elemnets
}
function toggleTask(id){
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id){
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