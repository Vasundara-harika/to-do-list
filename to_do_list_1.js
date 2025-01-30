let todoItemsContainer = document.getElementById("todoItemsContainer");

// let todoList = [
//     {
//       text: "Learn HTML",
//       uniqueNo:1
//     },
//     {
//       text: "Learn CSS",
//       uniqueNo:2
//     },
//     {
//       text: "Learn JavaScript",
//       uniqueNo:3
//     }
// ];    
// //(before Local storing this object is used after saved it can be deleted )

let todoList=[];


function getTodoListFromLocalStorage(){
  let stringfiedTodoList=localStorage.getItem("todoList");
  let parsedTodoList=JSON.parse(stringfiedTodoList);

  if(parsedTodoList===null){
    return[];
  }
  else{
    return parsedTodoList;
  }
}
todoList=getTodoListFromLocalStorage();

function onTodoStatusChange(checkboxId,labelId,todoId){
  let checkboxElement=document.getElementById(checkboxId);
  let labelElement=document.getElementById(labelId);
  
  if(checkboxElement.checked === true){
    labelElement.classList.add("checked");
  }
  else{ 
    labelElement.classList.remove("checked");
  } //all this code is replaced by this "toggle" condition
  
  // labelElement.classList.toggle("checked");
  let todoObjectIndex=todoList.findIndex(function(eachTodo){
    let eachTodoId="todoId"+eachTodo.uniqueNo;
    return eachTodoId===todoId;

    // if (eachTodoId===todoId){
    //   return true;
    // }
    // else{
    //   return false;
    // }
  });

    if (todoObjectIndex!==-1){
    let todoObject=todoList[todoObjectIndex];
    // if(todoObject.isChecked===true){
    //   todoObject.isChecked=false;
    // }
    // else{
    //   todoObject.isChecked=true;
    // }
    todoObject.isChecked=checkboxElement.checked;
    // localStorage.setItem("todoList",JSON.stringify(todoList));

  }
}

function onDeleteTodo(todoId){
  let todoElement=document.getElementById(todoId);
  todoItemsContainer .removeChild(todoElement);

  //// (This code is to delete todo item when clicked on dustbin)
  let deleteElementIndex=todoList.findIndex(function(eachTodo){
    let eachTodoId="todoId"+eachTodo.uniqueNo;// todo
  
    // if(eachTodoId===todoId){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    return eachTodoId===todoId;
  });

  if (deleteElementIndex!==-1){
  todoList.splice(deleteElementIndex,1);
  }
}


function createAndAppendTodo(todo) {
    let checkboxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoId="todoId"+todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);
    todoElement.id=todoId;


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    
    inputElement.checked=todo.isChecked;
    inputElement.onclick=function(){
      onTodoStatusChange(checkboxId,labelId,todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
    
    

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    
    if (todo.isChecked){
      labelElement.classList.add("checked");
    }
    
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick=function(){
      onDeleteTodo(todoId);
    };

  
}

for(let todo of todoList){
    createAndAppendTodo(todo);
}

let addTodoButton=document.getElementById("addTodoButton");

addTodoButton.onclick=function(){
  onAddTodo();
}

function onAddTodo(){
  let userInputElement=document.getElementById("todoUserInput");
  let userInputValue=userInputElement.value.trim();
  
  if (userInputValue===""){
    alert("Enter Valid Text");
    return;
  }
  
  let todosCount=todoList.length;
  todosCount=todosCount+1;

  let newTodo={
    text:userInputValue,
    uniqueNo:todosCount,
    isChecked:false
  };

  

  createAndAppendTodo(newTodo);

  todoList.push(newTodo);
  // localStorage.setItem("todoList",JSON.stringify(todoList));
  userInputElement.value = ""; 

};

let saveTodoButton=document.getElementById("saveToDoButton");
saveTodoButton.onclick=function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
};

