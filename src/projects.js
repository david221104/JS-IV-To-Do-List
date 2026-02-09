export { renderProject, createEl };

const p = document.querySelector('#your-projects');

function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}

function renderProject(title) {
    const projectDiv = createEl('div', 'projectDiv');  
    const titleP = createEl('p', 'titleP', title);
    const removePIcon = createEl('div', 'removePIcon');
    const statusP = createEl('div', 'statusP');

    projectDiv.append(titleP, statusP, removePIcon);
    p.append(projectDiv);
}