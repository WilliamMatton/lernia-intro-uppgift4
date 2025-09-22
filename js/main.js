const textInput = document.querySelector("#textInput");
const submitButton = document.querySelector("#submitButton");
const alertText = document.querySelector("#alertText");
const itemList = document.querySelector("#itemList");
const completedItemsLabel = document.querySelector("#completedItemsLabel");
let listItems = [];

let completedItemsCount = 0;

submitButton.addEventListener("click", SubmitTodoItem);

function SubmitTodoItem() {
    alertText.textContent = "";
    const task = textInput.value.trim();
    if(task.length == 0) {
        alertText.textContent = "The input field can't be empty, you need to write something you want to add to the list.";
        return;
    }

    const entry = document.createElement("li");
    const deleteButton = document.createElement("span");
    const taskTextElement = document.createElement("span");

    const item = {
        textElement: taskTextElement,
        name: task,
        completed: false,
        updateStatus: function() {
            this.completed = !this.completed;
            this.textElement.classList.toggle("completed");
            
            this.completed ? completedItemsCount++ : completedItemsCount--;
            UpdateTaskCounter();
        }
    };
    listItems.push(item);
    
    // Todo text
    taskTextElement.textContent = task;
    taskTextElement.addEventListener("click", function() {
        UpdateTodoItem(item);
    });
    entry.appendChild(taskTextElement);

    // Delete button
    deleteButton.innerHTML = "&#x1F5D1";
    deleteButton.addEventListener("click", function() {
        DeleteTodoItem(item, entry);
    });
    entry.appendChild(deleteButton);

    itemList.appendChild(entry);

    textInput.value = "";
}

function UpdateTodoItem(item) {
    item.updateStatus();
}

function DeleteTodoItem(item, entry) {
    if(item.completed) {
        completedItemsCount--;
        UpdateTaskCounter();
    }
    
    let text = entry.firstChild.textContent;
    let index = listItems.map(t => t.name).indexOf(text);

    entry.remove();
    listItems.splice(index, 1);
}

function UpdateTaskCounter() {
    completedItemsLabel.innerHTML = completedItemsLabel.textContent.substring(0, 27) + completedItemsCount;
}