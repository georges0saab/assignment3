const tasks = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish assignment", completed: false }
]; //created an array of task that is known with an id, what is the task and if its completed

const task_list=document.getElementById('task_list'); 
const task_input=document.getElementById('task_input');

function renderTasks() { // to avoid duplicates
    task_list.innerHTML = ''; //erase everything inside the <ul> with the id task list 

    tasks.forEach((tasks) =>{
        const list=document.createElement('li'); // li is a tab so we u create he will know that u mean to create <li>
        //list.textContent=input.text
        //replaced that list only have a textbox input so il will be composed of a checkbox, the text and a delete button
        const inputs=document.createElement('input');
        inputs.type="checkbox";
        const span=document.createElement('span');
        span.textContent=tasks.text;
        const deleteb=document.createElement('button');
        deleteb.textContent='x';
        // we need:<button class="delete-btn">x</button> and classList <=> class=""
        deleteb.classList.add('delete-btn'); // to let the listener recognize the delete button
        //list.dataset.index = index; // save index for each element
        list.dataset.id = task.id; //id instead of index cause when we delete smth id dont shift
        if (task.completed) {
            list.classList.add('completed'); // edit css
        }
        task_list.append(list); // so its like adding to div
        list.append(inputs, span, deleteb); // added in li checkbox, text and delete button
    })
}

function addTask() {
    const text = task_input.value.trim(); // we trim to remove any blank space,
    if (text === '') {
    alert('Task cannot be empty!');
    return;
  } //check if my text is empty after checking for the spaces after removing them or if i didnt input anything
    const task = {
    id: Date.now(),
    text: text,
    completed: false
  }; // this is my tasks elements
    tasks.push(task);//added it to my list of task in the array
    task_input.value = ''; //clear the textarea back to empty
    renderTasks();// re-erase everything inside and rebuild it, so it includes the new task too
}

const addButton = document.querySelector('.add_task button');//class in html
addButton.addEventListener('click', addTask); //event listener
task_input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
            event.preventDefault(); //to not insert a new line and be able to use the add Task function
            addTask();
  }
});

renderTasks(); // initial render so the two hardcoded tasks show up when the page loads