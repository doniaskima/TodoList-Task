//Select DOM
const form = document.querySelector("#task-form");
const todoList = document.querySelector(".collection");
const todoButton = document.querySelectorAll(".delete-item");
const todoInput = document.querySelector(".todo-input");
const clearTasks = document.querySelector(".clear-tasks");

// FUNCTIONS
function getItemFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
}

function isDuplicate() {
    let todos = getItemFromLocalStorage();
    let tasks = [];

    for (let i = 0; i < todos.length; i++) {
        tasks.push(todos[i].task);
    }

    return tasks.includes(todoInput.value);
}

const removeFromStorage = (todo) => {
    let todos;
    if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.splice(todos.indexOf(todo), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

const removeTodo = (...allButtons) => {
    for (let rmBtn of allButtons) {
        rmBtn.addEventListener("click", () => {
            removeFromStorage(rmBtn.parentElement.outerText);
            rmBtn.parentElement.remove();
        });
    }
};

const addTodo = (e) => {
    if (todoInput.value.trim() === "") {
        alert("Please enter a Task!");
        return;
    }
    // alert("Duplicate task")
    if (isDuplicate(todoInput.value)) {
        alert("This Task is already added!");
        return;
    }

    let newTodo = document.createElement("li");
    newTodo.classList.add("collection-item");
    let Link = document.createElement("a");
    Link.classList.add("delete-item", "secondary-content");
    let deleteItem = document.createElement("i");
    deleteItem.classList.add("fa", "fa-remove");
    newTodo.append(e);
    Link.append(deleteItem);
    newTodo.append(Link);
    removeTodo(newTodo.children[0]);
    todoList.append(newTodo);
    return newTodo.innerText;
};

// INTEGRATE LOCALSTORAGE

const saveLocalTodos = () => {
    if (localStorage.getItem("todos") !== null) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        for (let todo of todos) {
            addTodo(todo);
        }
    }
};


//save the task to the local storage
const addToDoStorage = (todo) => {
    let todos = getItemFromLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todo = addTodo(form.elements.task.value);
    addToDoStorage(todo);
});
clearTasks.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoList.children.length > 0) {
        const TodoArray = Array.from(todoList.children);
        TodoArray.forEach((todo) => {
            todo.remove();
        });
        localStorage.clear();
    }
});

saveLocalTodos();