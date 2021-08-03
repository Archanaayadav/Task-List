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

// Clear all tasks
function clearTasks(e){
  // taskList.remove();
  // taskList.innerHTML = ''; // or this way

  while(taskList.firstChild){        // or this faster way
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearLS();
}

// Clear from local storage
function clearLS(){
  localStorage.clear();
}

// filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){     // if value in filter task doesn't match any of the values in li having class collection-item then it will return -1. so when it not equal to -1 that is both the values matches it should display as block else display none.
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  )
}