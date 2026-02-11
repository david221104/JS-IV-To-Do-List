export { renderProject, createEl };
import { renderTaskCard, refreshTasks } from './tasks.js'

const newTaskButton = document.querySelector('#new-task');
const p = document.querySelector('#project-container');
import { projectManager, projectCreator, createTask } from './logic.js'


function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}


const renderProject = (project) => {
    const projectDiv = createEl('div', 'projectDiv');  
    const titleP = createEl('p', 'titleP', project.title);
    const removePIcon = createEl('div', 'removePIcon', 'X');

    projectDiv.append(titleP, removePIcon);
    p.append(projectDiv);

    projectDiv.addEventListener('click', () => {     
        const allProjects = document.querySelectorAll('.projectDiv');
        allProjects.forEach(project => project.style.border = 'none');
        projectDiv.style.border = '2px solid black';
        projectManager.projectStatus(project);
        console.log('Active project:', project.title);
        refreshTasks();
    });

    removePIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        projectManager.removeProject(project.projectId);
        projectDiv.remove();
        const tasks = document.querySelector('#task-container');
        if(tasks) tasks.innerHTML = '';
    });
}

if(newTaskButton) {
    newTaskButton.addEventListener('click', () => {
        renderTaskCard();
    });
}
