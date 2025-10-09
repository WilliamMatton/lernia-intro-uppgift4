const textInput = document.querySelector("#textInput");
const submitButton = document.querySelector("#submitButton");
const alertText = document.querySelector("#alertText");
const itemList = document.querySelector("#itemList");
const completedItemsLabel = document.querySelector("#completedItemsLabel");

let listItems = [];

let completedItemsCount = 0;

window.addEventListener("load", () => {
    document.querySelector("#todoWindow").classList.add("animateTodoWindow");
    document.querySelector("h1").classList.add("animateFadeIn");
    completedItemsLabel.classList.add("animateFadeIn");
    textInput.classList.add("animateFadeIn");
    submitButton.classList.add("animateFadeIn");
});

submitButton.addEventListener("click", SubmitTodoItem);

function SubmitTodoItem() {
    alertText.textContent = "";
    alertText.classList.remove("animateAlert");
    const task = textInput.value.trim();
    if(task.length == 0) {
        alertText.textContent = "Input must not be empty";
        alertText.classList.add("animateAlert");
        textInput.value = "";
        return;
    }

    const entry = document.createElement("li");
    const deleteButton = document.createElement("span");
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("itemText");

    const item = {
        textElement: taskTextElement,
        name: task,
        completed: false,
        updateStatus: function() {
            this.completed = !this.completed;
            this.textElement.classList.toggle("completed");
            
            this.completed ? completedItemsCount++ : completedItemsCount--;
            UpdateTaskCounterLabel();
        }
    };
    listItems.push(item);
    
    // Todo text
    taskTextElement.textContent = task;
    taskTextElement.addEventListener("click", () => {
        UpdateTodoItem(item);
    });
    entry.appendChild(taskTextElement);

    // Delete button
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "&#x1F5D1";
    deleteButton.addEventListener("click", () => {
        DeleteTodoItem(item, entry);
    });
    entry.appendChild(deleteButton);

    itemList.appendChild(entry);

    textInput.value = "";
    UpdateTaskCounterLabel();
}

function UpdateTodoItem(item) {
    item.updateStatus();
}

function DeleteTodoItem(item, entry) {
    if(item.completed) {
        completedItemsCount--;
    }
    
    let text = entry.firstChild.textContent;
    let index = listItems.map(t => t.name).indexOf(text);

    entry.remove();
    listItems.splice(index, 1);

    UpdateTaskCounterLabel();
}

function UpdateTaskCounterLabel() {
    completedItemsLabel.innerHTML = completedItemsCount + " completed";
}