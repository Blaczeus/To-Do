window.onload = () => {
    displayTask();
};

let taskField = document.getElementById( 'task' );
let descriptionField = document.getElementById( 'description' );
let submitBtn = document.getElementById( 'submit' );
let taskList = document.getElementById( 'taskList' );
let entries = JSON.parse( localStorage.getItem( "tasks" ) ) || [];
let currentEditIndex = null;


submitBtn.addEventListener( 'click', handleSubmit );

taskList.addEventListener( 'click', function ( event ) {
    if (event.target.tagName === 'BUTTON') {
        let button = event.target;
        let taskId = button.getAttribute( 'data-id' );
        
        if ( button.textContent === 'Delete' )
        {
            if ( confirm( "Are you sure you want to delete this task?" ) )
            {
                deleteTask( taskId );
            }
        } else if ( button.textContent === 'Edit Task' )
        {
            if ( confirm( "Do you want to edit this task?" ) )
            {
                editTask( taskId );
            }
        }
    }  
})

function handleSubmit() {
    if (submitBtn.textContent === 'Save Task') {
        saveTask();
    } else if (submitBtn.textContent === 'Update') {
        updateTask(currentEditIndex);
    }
}


function saveTask ()
{
    let taskInput = taskField.value;
    let descriptionInput = descriptionField.value;
    
    if (!taskInput) {
        alert("Please fill in the task field.");
        return;
    }
    
    entries = getTasks();

    let newTask = {
        id: Date.now(),
        task: taskInput,
        description: descriptionInput || ""
    };
    entries.push( newTask );
    localStorage.setItem("tasks", JSON.stringify(entries));
    alert( "Task Saved" );
    taskField.value = "";
    descriptionField.value = "";
    displayTask();
}

function getTasks ()
{
    entries = JSON.parse( localStorage.getItem( "tasks" ) ) || [];
    return entries;
    
}

function displayTask ()
{
    entries = getTasks();
    taskList.innerHTML = '';

    entries.forEach( ( task, index ) =>
    {
        let taskId = task.id;
        let taskElement = document.createElement( 'li' );
        taskElement.className = "list-group-item d-flex justify-content-between align-items-center";

        let checkBox = document.createElement( 'input' );
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed || false;
        checkBox.className = 'form-check-input me-2';
        checkBox.addEventListener('change', () => {toggleTaskCompletion(taskId)});

        let taskText = document.createElement( 'span' );
        taskText.textContent = `${ index + 1 }. ${ task.task } ${ task.description ? `- ${ task.description }` : '' } `;

        let taskBtns = document.createElement( 'div' );
        taskBtns.className = "d-flex justify-content-end gap-2";
        
        
        let deleteBtn = document.createElement( 'button' );
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-id', taskId);

        
        let editBtn = document.createElement( 'button' );
        editBtn.className = 'btn btn-info btn-sm';
        editBtn.textContent = 'Edit Task';
        editBtn.setAttribute('data-id', taskId) ;
        
        taskBtns.appendChild( checkBox );
        taskBtns.appendChild( editBtn );
        taskBtns.appendChild( deleteBtn );        

        taskElement.appendChild(taskText); 
        taskElement.appendChild( taskBtns);
        
        taskList.appendChild( taskElement );
    });
}

function deleteTask (taskId) {
    entries = getTasks();
    entries = entries.filter(task => task.id !== Number(taskId));
    localStorage.setItem( "tasks", JSON.stringify( entries ) );
    displayTask();
    alert("Task Deleted");
}

function editTask(taskId) {
    entries = getTasks();
    let index = entries.findIndex( task => task.id === Number( taskId ) );
    
    if (index === -1) {
        alert( 'Task not found' );
        return;
    }

    currentEditIndex = index;
    let taskToEdit = entries[index];
    
    taskField.value = taskToEdit.task;
    descriptionField.value = taskToEdit.description;

    submitBtn.textContent = 'Update';
    submitBtn.classList.remove('btn-success');
    submitBtn.classList.add('btn-info');
}

function updateTask(index) {
    let updatedTask = taskField.value.trim();
    let updatedDescription = descriptionField.value.trim();

    if (!updatedTask) {
        alert("Please fill in the task field.");
        return;
    }

    entries[ index ] = {
        id: entries[ index ].id,
        task: updatedTask,
        description: updatedDescription
    };

    localStorage.setItem("tasks", JSON.stringify(entries));

    alert("Task Updated");

    taskField.value = "";
    descriptionField.value = "";

    submitBtn.textContent = 'Save Task';
    submitBtn.classList.remove('btn-info');
    submitBtn.classList.add('btn-success');

    currentEditIndex = null;

    displayTask();
}

