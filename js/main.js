const textInput = document.querySelector('#textInput');
const submitButton = document.querySelector('#submitButton');
const itemList = document.querySelector('#itemList');
const completedItemsLabel = document.querySelector('#completedItemsLabel');
let listItems = [];

let completedItemsCount = 0;

submitButton.addEventListener('click', SubmitTodoItem);

function SubmitTodoItem() {
    const task = textInput.value.trim();
    if(task.length == 0) {
        alert("The input field can't be empty, you need to write something to add to the list.");
        return;
    }

    const entry = document.createElement('li');
    entry.classList.add('waiting');

    const item = {
        task: textInput.value,
        element: entry,
        completed: false,
        updateStatus: function() {
            this.completed = !this.completed;
            this.element.classList.toggle('completed');
            this.element.classList.toggle('waiting');
            
            this.completed ? completedItemsCount++ : completedItemsCount--;
            UpdateTaskCounter();
        }
    };
    listItems.push(item);

    const deleteButton = document.createElement('i');
    deleteButton.innerHTML = 'delete';
    deleteButton.className = 'material-icons';
    deleteButton.addEventListener('click', function() {
        DeleteTodoItem(item, deleteButton);
    });
    itemList.appendChild(deleteButton);

    entry.appendChild(document.createTextNode(item.task));
    entry.addEventListener('click', function() {
        CompleteTodoItem(item);
    });

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