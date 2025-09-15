const textInput = document.querySelector('#textInput');
const submitButton = document.querySelector('#submitButton');
const itemList = document.querySelector('#itemList');
const completedItemsLabel = document.querySelector('#completedItemsLabel');
submitButton.addEventListener('click', SubmitTodoItem);
let completedItemsCount = 0;
const listItems = [];

function SubmitTodoItem() {
    const task = textInput.value;
    if(task.length == 0) {
        alert("The input field can't be empty, you need to write something to add to the list.");
        return;
    }

    const item = {
        task: textInput.value
    };
    listItems.push(item);
    
    const entry = document.createElement('li');
    entry.appendChild(document.createTextNode(listItems.at(listItems.length - 1).task));
    itemList.appendChild(entry);

    textInput.value = '';
}