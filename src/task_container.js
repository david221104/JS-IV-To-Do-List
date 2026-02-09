export {taskContainer};

const taskContainer = document.querySelector('#task-container');

function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}
