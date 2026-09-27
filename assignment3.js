let tasks = [
  { id: 1, text: "playing football", completed: false },
  { id: 2, text: "showering ", completed: false }
];

const tasklist = document.getElementById('task_list');

function renderTasks() {
  tasklist.innerHTML = ""; // freh el list 2abel ma nebniha men jdeed

  tasks.forEach((task, index) => {
    const list = document.createElement('li');
    list.textContent = task.text;
    list.dataset.index = index;

    if (task.completed) {
      list.classList.add("completed");
    }

    tasklist.append(list);
  });
}

renderTasks();

function addTask(text){
    const trimmedtext= text.trim();

}