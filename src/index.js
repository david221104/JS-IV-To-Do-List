import './style.css' 
import { projectManager, projectCreator, createTask } from './logic.js'
import { renderProject, createEl } from './projects.js';
import './tasks.js';

function loadLocalStorage() {
    const savedData = localStorage.getItem('projects');  
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const projectsArray = Array.isArray(parsed) ? parsed : [parsed];

        projectManager.loadProjects(projectsArray);

        const aliveProjects = projectManager.currentProjects;

        aliveProjects.forEach(project => {
            renderProject(project);
        });

        const allProjects = projectManager.currentProjects;
        if (aliveProjects.length > 0) {
            const firstProject = aliveProjects[0];
            projectManager.projectStatus(firstProject);

            const projectDivs = document.querySelectorAll('.projectDiv');
            projectDivs.forEach(div => {
                div.style.border = 'none';
                if (div.querySelector('.titleP')?.textContent === firstProject.title) {
                    div.style.border = '2px solid black';
                }
            });

            refreshTasks();   
        };
    };
};

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
        projectManager.saveProjects();
        renderProject(newProject);
    });
});

loadLocalStorage();
