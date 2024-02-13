// Will be called when todo app is opened
const start = () => {
  todoList = setInitialValue(); //global variable
  displayTodo();
};

// sets initial value for variable "todoList"
const setInitialValue = () => {
  // console.log("inside setInitialValue() function");
  if (localStorage.hasOwnProperty("todo_list")) {
    return JSON.parse(localStorage.getItem("todo_list"));
  } else {
    return [];
  }
};

// adds a todo on "Add" button click
const addTodo = (todoName, todoDate) => {
  let todoItem = { name: todoName, date: todoDate };
  todoList.push(todoItem);
  localStorage.setItem("todo_list", JSON.stringify(todoList)); //adding in local storage
  document.querySelector("#todoName").value = "";
  displayTodo();
};

// displays all todo lists
const displayTodo = () => {
  let todoListElement = document.querySelector("#todo-list");
  if (todoList.length == 0) {
    todoListElement.innerText = "No records found...";
  } else {
    let htmlCode = ``;
    for (let i = 0; i < todoList.length; i++) {
      htmlCode += `
      <div class="todo-row">
          <div class="todo-name">${todoList[i].name}</div>
          <div class="todo-date">${todoList[i].date}</div>
          <button class="todo-del" onclick="delTodo(${i})">Delete</button>
        </div>`;
    }
    htmlCode += `<button id="todo-del-all" onclick="delAllTodo();">Delete All</button>`;
    todoListElement.innerHTML = htmlCode;
  }
};

// deletes a todo on "Delete" button click
const delTodo = (indexNum) => {
  todoList.splice(indexNum, 1);
  localStorage.setItem("todo_list", JSON.stringify(todoList));
  displayTodo();
};

// deletes all todo on "Delete All" button click
const delAllTodo = () => {
  localStorage.clear();
  todoList.splice(0);
  displayTodo(); 
}

start();
