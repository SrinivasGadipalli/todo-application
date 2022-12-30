let todoContainer = document.getElementById('todoContainer');
let addElement = document.getElementById('createElementBtn');
let saveToDoButton = document.getElementById('saveToDoButton');

function getToDoListfromLocalStorage() {
    let stringifyList = localStorage.getItem('todoList1');
    let parseTodolist = JSON.parse(stringifyList);

    if (parseTodolist === null) {
        return [];
    } else {
        return parseTodolist;
    }
}

let todoList1 = getToDoListfromLocalStorage();

/* localStorage setItem */

saveToDoButton.onclick = function() {

    localStorage.setItem('todoList1', JSON.stringify(todoList1));
}

/* CHECKED STATUS */
function toDoStatusChange(checkedId, labelId) {
    let checkedElement = document.getElementById(checkedId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle('checked');
}

/* DELETE THE TASK */
function onDeleteToDo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoContainer.removeChild(todoElement);

    let deleteItemIndex = todoList1.findIndex(function(eachItem) {
        let eachTodoId = 'todo' + eachItem.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList1.splice(deleteItemIndex, 1);
}


function createTodoList(todo) {
    let todoId = 'todo' + todo.uniqueId;
    let checkedId = 'checked' + todo.uniqueId;
    let labelId = 'label' + todo.uniqueId;

    /* li Element */
    let todoElement = document.createElement('li');
    todoElement.classList.add('li-container');
    todoElement.id = todoId;
    todoContainer.appendChild(todoElement);

    /* Input Element */
    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.classList.add('input-element')
    inputElement.id = checkedId;

    inputElement.onclick = function() {
        toDoStatusChange(checkedId, labelId)
    }
    todoElement.appendChild(inputElement);

    /* label Container Element */
    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container')
    todoElement.appendChild(labelContainer);

    /* Label Element */
    let labelElement = document.createElement('label');
    labelElement.htmlFor = checkedId;
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    /* Delete Container */
    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');

    deleteIcon.onclick = function() {
        onDeleteToDo(todoId);
    }

    deleteContainer.appendChild(deleteIcon);
}

for (let todo of todoList1) {
    createTodoList(todo);
}

let todocount = todoList1.length;

function onAddToDo() {
    let userInputElement = document.getElementById('toDoUserInput');
    let userInputValue = userInputElement.value;

    if (userInputValue === '') {
        alert('Enter valid task');
        return;
    }

    todocount += 1;

    let newTodo = {
        text: userInputValue,
        uniqueId: todocount
    };
    todoList1.push(newTodo);
    createTodoList(newTodo);
    userInputElement.value = '';
}

addElement.onclick = function() {
    onAddToDo();
}