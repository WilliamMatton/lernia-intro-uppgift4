const textInput = document.querySelector('#textInput');
const submitButton = document.querySelector('#submitButton');
const alertText = document.querySelector('#alertText');
const itemList = document.querySelector('#itemList');
const completedItemsLabel = document.querySelector('#completedItemsLabel');
let listItems = [];

let completedItemsCount = 0;

submitButton.addEventListener('click', SubmitTodoItem);

function SubmitTodoItem() {
    alertText.textContent = "";
    const task = textInput.value.trim();
    if(task.length == 0) {
        alertText.textContent = "The input field can't be empty, you need to write something you want to add to the list.";
        return;
    }

    const entry = document.createElement('li');
    const deleteButton = document.createElement('i');
    const taskTextElement = document.createElement('span');

    const item = {
        element: entry,
        textElement: taskTextElement,
        completed: false,
        updateStatus: function() {
            this.completed = !this.completed;
            this.textElement.classList.toggle('completed');
            
            this.completed ? completedItemsCount++ : completedItemsCount--;
            UpdateTaskCounter();
        }
    };
    listItems.push(item);
    
    deleteButton.innerHTML = 'delete';
    deleteButton.classList.add('material-icons');
    deleteButton.addEventListener('click', function() {
        DeleteTodoItem(item, deleteButton);
    });
    entry.appendChild(deleteButton);
    
    taskTextElement.textContent = task;
    taskTextElement.addEventListener('click', function() {
        CompleteTodoItem(item);
    });
    entry.appendChild(taskTextElement);

    itemList.appendChild(entry);

    textInput.value = '';
}

function CompleteTodoItem(task) {
    task.updateStatus();
}

function DeleteTodoItem(item, deleteButton) {
    if(item.completed) {
        completedItemsCount--;
        UpdateTaskCounter();
    }
    item.element.remove();
    deleteButton.remove();
    
    let index;
    for(i = 0; i < listItems.length; i++) {
        if(listItems[i] == item) {
            index = i;
            break;
        }
    }

    const newArray = [];
    for(i = 0; i < listItems.length; i++) {
        if(i == index)
            continue;
        newArray.push(listItems[i]);
    }
    listItems = newArray;
}

function UpdateTaskCounter() {
    completedItemsLabel.innerHTML = completedItemsLabel.textContent.substring(0, 27) + completedItemsCount;
}