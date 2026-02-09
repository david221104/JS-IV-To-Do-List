import './style.css' 
import { projectManager, projectCreator, createTask } from './logic.js'
import { renderProject, createEl } from './projects.js';
import { taskDiv } from './tasks.js';
import {taskContainer} from './task_container.js';

const container = document.querySelector('#container'); 
const newProject = document.querySelector('#new-project');
const newTask = document.querySelector('#new-task');


const popup = (e) => {
    const popupDiv = createEl('div', 'popupDiv');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'titleInput');
    const popupButton = createEl('button', 'popupButton', 'Confirm');
    popupDiv.append(titleInput, popupButton);
    container.append(popupDiv);
    popupButton.addEventListener('click', () => {
        
        const inputTitle = titleInput.value;
        if(inputTitle === '') {
            alert('You need to enter the title');
            return;
        }
        e(inputTitle);
        popupDiv.remove();
    });
};


newProject.addEventListener('click', (e) => {
    popup(function(inputTitle) {
        const newProject = projectCreator(inputTitle);
        const list = projectManager.registerProject(newProject);
        renderProject(inputTitle);  
    });
    projectManager.getProject();
});



