const textInput = document.querySelector('#textInput');
const submitButton = document.querySelector('#submitButton');
const itemList = document.querySelector('#itemList');
const completedItemsLabel = document.querySelector('#completedItemsLabel');
let listItems = [];

let completedItemsCount = 0;

submitButton.addEventListener('click', SubmitTodoItem);

function SubmitTodoItem() {
    const task = textInput.value;
    if(task.length == 0) {
        alert("The input field can't be empty, you need to write something to add to the list.");
        return;
    }

    const entry = document.createElement('li');
    entry.className = 'waiting';

    const item = {
        task: textInput.value,
        element: entry,
        completed: false,
        updateStatus: function() {
            this.completed = !this.completed;
            this.element.className == 'waiting' ? this.element.className = 'completed' : this.element.className = 'waiting';
            
            this.completed ? completedItemsCount++ : completedItemsCount--;
            UpdateTaskCounter();
        }
    };
    listItems.push(item);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', function() {
        DeleteTodoItem(item);
    });
    entry.appendChild(deleteButton);

    const textElement = document.createElement('p');
    textElement.textContent = listItems.at(listItems.length - 1).task;
    entry.appendChild(textElement);
    textElement.addEventListener('click', function() {
        CompleteTodoItem(textElement.textContent);
    });

    itemList.appendChild(entry);

    textInput.value = '';
}

function CompleteTodoItem(taskName) {
    let task;
    for(i = 0; i < listItems.length; i++) {
        if(listItems[i].task == taskName) {
            task = listItems[i];
            break;
        }
    }
    task.updateStatus();
}

function DeleteTodoItem(item) {
    if(item.completed) {
        completedItemsCount--;
        UpdateTaskCounter();
    }
    item.element.remove();
    
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