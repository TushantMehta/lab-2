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

       
        

        editCell.appendChild(editButton);


        //Add the cells to the row
        todoRow.appendChild(nameCell);
        todoRow.appendChild(dateCell);
       
       
       

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


 