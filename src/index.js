import './style.css' 
import { projectManager, projectCreator, createTask } from './logic.js'
import { renderProject, createEl } from './projects.js';
import './tasks.js';

const container = document.querySelector('#container'); 
const newProject = document.querySelector('#new-project');
const popup = (e) => {
    
    const overlay = createEl('div', 'overlay');

    const popupDiv = createEl('div', 'popupDiv');
    const titlePopup = createEl('div', 'titlePopup', 'Your project name:');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'titleInput');
    const popupButton = createEl('button', 'popupButton', 'Confirm');
    popupDiv.append(titlePopup ,titleInput, popupButton);
    overlay.append(popupDiv);
    document.body.append(overlay);
    popupButton.addEventListener('click', () => {
        
        if(popupDiv) {};
        const inputTitle = titleInput.value;
        if(inputTitle === '') {
            const errorPopup = createEl('p', 'errorPopup', 'Please enter the title');
            errorPopup.style.color = 'red';
            popupDiv.append(errorPopup);
            return; 
        }
        e(inputTitle);
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.remove();
        };
    });
};


newProject.addEventListener('click', (e) => {
    popup(function(inputTitle) {
        const newProject = projectCreator(inputTitle);
        projectManager.registerProject(newProject);
        renderProject(newProject);
    });
});
