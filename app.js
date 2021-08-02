// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function for load all event listeners
loadEventListeners(); 

// load event listeners
function loadEventListeners(){

  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit',addTask);

  // Remove task event 
  taskList.addEventListener('click',removeTask);

  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks events
  filter.addEventListener('keyup', filterTasks);
}
 
// Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    // Create a list of li elements
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create Text Node and Append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element for cross
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content'
    // add cross icon to html
    link.innerHTML = '<i class="fas fa-times"></i>';
    // append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    })
}

// ADD  TASK
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task');
  } else {

  // Create a list of li elements
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create Text Node and Append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element for cross
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content'
  // add cross icon to html
  link.innerHTML = '<i class="fas fa-times"></i>';
  // append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  
  // store in Local Storage
  storeTask(taskInput.value);

  // Clear input once task is added
  taskInput.value = '';
  }
  // console.log(li);

  e.preventDefault();
}

// Store Task
function storeTask(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure')){
      e.target.parentElement.parentElement.remove();  

      // REMOVE FROM LS
      removeLS(e.target.parentElement.parentElement);
    } 
  };
}

// Remove from LS
function removeLS(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
