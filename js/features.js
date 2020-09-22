class TodoTask {
    task = "";
    date = "";
    key = "";
    

  static todoItem(task, date, key){
      var todoTask = new TodoTask;
      todoTask.name = task;
      todoTask.date = date;
      todoTask.key = key;
      return todoTask;
  }
  }


function addTodoItem()  {
    var task = document.getElementById("name").value;
    var date = document.getElementById("date").value;

    //making key
    var key = makeKey(6);

    //creating new object
    var newTodoItem = TodoTask.todoItem(task, date, key);

    if (!sessionStorage.getItem('todoList'))    {

       
        sessionStorage.setItem('todoList', '[]');
        
    }

    //Parse out (de-serialize) 
    var todoList = JSON.parse(sessionStorage.getItem('todoList'));

    //Add the data to the array
    todoList.push(newTodoItem);

    //Re-serialize for storage
    sessionStorage.setItem('todoList', JSON.stringify(todoList));

   

    //Display the todo List
    displayTodoList();

}

/* this function will display all the todo Items in a table */
function displayTodoList()  {
    
    var todoListTable = document.getElementById("todoListTable");

    //Check if the table exists
    if (!todoListTable) {
        var todoListTable = document.createElement("table");
        todoListTable.id = "todoListTable";
    }else {
        //Clear the table
    todoListTable = document.getElementById("todoListTable");

    while (todoListTable.hasChildNodes()) {
        todoListTable.removeChild(todoListTable.firstChild);
    }
        }
    



    //Pull in the todo list
    todoList = JSON.parse(sessionStorage.getItem('todoList'));
    


    for (var i = 0; i < todoList.length; i++) {

        
        //Make a row
        var todoRow = document.createElement("tr");
        //Make some cells
        var nameCell = document.createElement("td");
        var dateCell = document.createElement("td");
        



        //Add some text
        nameCell.appendChild(document.createTextNode(todoList[i].name));

        dateCell.appendChild(document.createTextNode(todoList[i].date));

       
        

        

       
       
       
        //deleteButton Cell:
        var deleteCell = document.createElement("td");

        //delete Button:
        deleteButton = document.createElement("button");
        deleteButton.id = todoList[i].key;
        deleteButton.innerText = "Delete";
        deleteButton.onclick = deleteTodoItem;

        deleteCell.appendChild(deleteButton);
      
       

         //Add the cells to the row
         todoRow.appendChild(nameCell);
         todoRow.appendChild(dateCell);
         todoRow.appendChild(deleteCell);

        //Add the row to the table
        todoListTable.appendChild(todoRow);
        

         

    }

    

    //Add the table to the div.
    var todoListDiv = document.getElementById("todoList");
    todoListDiv.appendChild(todoListTable);

}

// to get unique key for each task:
function makeKey(length) {
    var string           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       string += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return string;
 }


 function clearTodoTable()   {

    //Clear the table
    todoListTable = document.getElementById("todoListTable");

    while (todoListTable.hasChildNodes()) {
        todoListTable.removeChild(todoListTable.firstChild);
    }

}

function clearList() {
    //Clear the storage
    
    sessionStorage.clear();

    clearTodoTable();

}

function deleteTodoItem() {


    //Pull the JSON array from sessionStorage
    var todoList = JSON.parse(sessionStorage.getItem('todoList'));
    
    for (i = 0; i < todoList.length; i++)   {
        if (this.id == todoList[i].key)  {
            
            todoList.splice(i,1);
        }
    }    
    //re-seralize the array    
    //Push the todo list back to session storage
    sessionStorage.setItem('todoList', JSON.stringify(todoList));

    displayTodoList();

}


function editTodoItem(){

    var todoList = JSON.parse(sessionStorage.getItem("todoList"));

    for(var i = 0; i < todoList.length; i++){
        if (this.id == todoList[i].key){
            var input = document.getElementById("name");
            var date = document.getElementById("date");

            var number = i;
            input.value = "Enter new and click Save";
            date.value = "";

           

            if(input.onchange = true) {
            if (date.onchange = true) { //console.log("hhhhhh");

            var newButton = document.getElementById("addButton");
            newButton.innerText = "Save";
            
            newButton.onclick = function changeInput(){
                
                var name = document.getElementById("name").value;
                var date = document.getElementById("date").value;
                todoList[number].name = name;
                //console.log(todoList[number].name);
                todoList[number].date = date;

                //sending data to server:
                var list = JSON.stringify(todoList);
                sessionStorage.setItem("todoList", list);

                displayTodoList();


                //turning back the fucntion of Add todo Item:
                var oldButton = document.getElementById("addButton");
                oldButton.innerText = "Add todo Item";
                oldButton.onclick = addTodoItem;
            
            //console.log("position: " + todoList[i].name);
            
            }

            
        
        }

    }
    
    
 }
}
 }