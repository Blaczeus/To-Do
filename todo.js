window.onload = () => {
    displayTask();
};

let submitBtn = document.getElementById( 'submit' );
let taskList = document.getElementById( 'taskList' );

submitBtn.addEventListener( 'click', function () {
    ( saveTask() )
} );

function saveTask ()
{
    let taskInput = document.getElementById( 'task' ).value;
    // let description = document.getElementById( 'description' ).value;
    
    if (!taskInput) {
        alert("Please fill in the task field.");
        return;
    }
    
    let entries = JSON.parse( localStorage.getItem( "tasks" ) ) || [];

    let newTask = { task: taskInput };
    entries.push( newTask );
    localStorage.setItem("tasks", JSON.stringify(entries));
    alert( "Task Saved" );
    taskInput = "";
    // description = "";
    displayTask();
}
function getTasks ()
{
    let entries = JSON.parse( localStorage.getItem( "tasks" ) ) || [];
    return entries;
    
}

function displayTask ()
{
    let taskItems = getTasks();
    taskList.innerHTML = '';

    taskItems.forEach( ( task, index ) =>
    {
        let taskId = index + 1;
        let taskElement = document.createElement( 'li' );
        taskElement.className = "list-group-item d-flex justify-content-between align-items-center";


        let taskText = document.createElement( 'span' );
        taskText.textContent = `${ taskId }. ${ task.task }`;
        
        let deleteBtn = document.createElement( 'button' );
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener( 'click', () =>
        {
            if ( confirm( "Are you sure you want to delete this task" ) )
            {
                deleteTask(index);
            }
            return;
        });

        taskElement.appendChild(taskText); 
        taskElement.appendChild( deleteBtn);
        
        taskList.appendChild( taskElement );
    });
    
    // taskItems.array.forEach(task => {
        
    // });
}

function deleteTask (index) {
    let entries = getTasks();
    entries.splice( index, 1 );
    localStorage.setItem( "tasks", JSON.stringify( entries ) );
    displayTask();
    alert("Task Deleted");
}