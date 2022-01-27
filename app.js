const form = document.querySelector('form');


const taskList = document.querySelector(".collection");

const delAll = document.querySelector("#deleteAll");

form.addEventListener('submit', addTask);

taskList.addEventListener('click', delItem);

delAll.addEventListener("click", deleteAll)

document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);




function addTask(event){
    const taskInput = document.querySelector('#task').value;

    // create list item
    const li = document.createElement("li");

    // add list item a class name so it would get the styling
    li.className = 'collection-item';


    // <li class="collection-item">test vms <span class="deleteItem"><a onclick="delItem()">X</a></span></li>

    const link = document.createElement('a');
    link.className = "secondary-content";
    link.setAttribute('href', "#");
    link.appendChild(document.createTextNode('X'));
    li.appendChild(link);

    addTaskToLocalStorage(taskInput);
    li.appendChild(document.createTextNode(taskInput));
    const ul = document.querySelector(".collection");
    ul.appendChild(li);
    document.querySelector('#task').value = "";


    event.preventDefault();
}

function delItem(e){
    const ul = document.querySelector(".collection");
    if(e.target.textContent === "X"){
        if(confirm("Sure you want to delete?")){
            let task = e.target.parentElement.textContent.substring(1);
            ul.removeChild(e.target.parentElement);
            console.log(task);
            deleteTaskFromLocalStorage(task);
        }
    }
}


function deleteAll(){
    const ul = document.querySelector(".collection");
    if(confirm("Sure you want to delete all items?")){
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        localStorage.removeItem('tasks');
    }

}

function addTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (tasksElement, index){
        if(tasksElement === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (tasksElement){
        // create <li> element
        const li = document.createElement('li');
        // add css class
        li.className = 'collection-item';
        // create text element
        const text = document.createTextNode(tasksElement);
        // add text to <li>
        li.appendChild(text);
        // create <a> element
        const link = document.createElement('a');
        // add css class
        link.className = 'secondary-content';
        // set href atribute to <a>
        link.setAttribute('href', '#');
        // add text content to <a>
        link.appendChild(document.createTextNode('X'));
        // add <a> to <li>
        li.appendChild(link);
        // add li to ul
        const ul = document.querySelector('.collection');
        ul.appendChild(li);
    });
}