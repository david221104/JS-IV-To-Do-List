import { projectManager, projectCreator, createTask } from './logic.js';
export { renderTaskCard, renderTask, refreshTasks }
// date-fns format for dueDate
import { format } from 'date-fns';

const taskContainer = document.querySelector('#task-container');

function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}

const renderTask = (newTask) => {
    const taskDiv = createEl('div', 'taskDiv');
    const renderChecklist = createEl('p', 'renderChecklist', 'Checklist: Not done');
    const renderTitle = createEl('p', 'renderTitle', `Title: ${newTask.title}`);
    const renderDate = createEl('div', 'renderDate');
    if(newTask.dueDate) {
        renderDate.textContent = 'Due date: ' + format(new Date(newTask.dueDate), 'dd.MM.yyyy');
    }
    else {
        dateDiv.textContent = 'No date';
    }
    const editButton = createEl('button', 'editButton', 'Edit');
    const removeTask = createEl('button', 'removeTask', 'X');
    const priorityDiv = createEl('div', 'priorityDiv', newTask.priority);
    priorityDiv.style.backgroundColor = 'orange';
    taskDiv.append(renderTitle, renderChecklist, renderDate, priorityDiv, editButton, removeTask);
    taskContainer.append(taskDiv);

    const taskDivs = document.querySelectorAll('.taskDiv');
    taskDivs.forEach(element => element.style.borderLeft = '1px solid #6b7f09');

    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        renderTaskCard(newTask);
    }); 
    
    removeTask.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeProject = projectManager.getActiveProject();
        activeProject.removeTask(newTask.taskId);

        refreshTasks();
    });

    renderChecklist.addEventListener ('click', (e) => {
        e.stopPropagation();
        const activeProject = projectManager.getActiveProject();
        if(newTask.checklist === false) {
            activeProject.changeChecklist(newTask);
            renderChecklist.textContent = 'Checklist: Done';
        }
        else {
            activeProject.changeChecklist(newTask);
            renderChecklist.textContent = 'Checklist: Not done';
        }
    });

    priorityDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeProject = projectManager.getActiveProject();
        activeProject.changePriority(newTask);
        priorityDiv.textContent = newTask.priority;
        if(newTask.priority === 'low') priorityDiv.style.backgroundColor = 'green';    
        if(newTask.priority === 'medium') priorityDiv.style.backgroundColor = 'orange';    
        if(newTask.priority === 'high') priorityDiv.style.backgroundColor = 'red';            
    });

    taskDiv.addEventListener('click', (e) => {
        if(taskDiv.classList.contains('expanded')) {
            const existingDetails = taskDiv.querySelector('.tasks-details');
            if(existingDetails) {
                existingDetails.remove();
            }
            taskDiv.classList.remove('expanded');
        }
        else {
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('tasks-details');
            const renderDesc = createEl('p', 'renderDesc', `Description: ${newTask.description || 'No description'}`);
            const renderNotes = createEl('p', 'renderNotes', `Notes: ${newTask.notes || 'No notes'}`);
            detailsDiv.append(renderDesc, renderNotes);
            taskDiv.append(detailsDiv);
            taskDiv.classList.add('expanded');

            detailsDiv.style.width = '100%';
            taskDiv.style.flexWrap = 'wrap';
        }
    });

};

const renderTaskCard = (taskToEdit = null) => {

    const overlay = createEl('div', 'overlay');

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.remove();
        }
    });

    const taskCardDiv = createEl('div', 'taskCardDiv');
    const taskTitle = document.createElement('input');
    taskTitle.setAttribute('type', 'text');
    taskTitle.setAttribute('id', 'taskTitle');
    
    const descriptionT = document.createElement('input');
    descriptionT.setAttribute('type', 'text');
    descriptionT.setAttribute('id', 'descriptionT'); 

    const taskPriority = createEl('div', 'taskPriority');

    const notesT = document.createElement('input');
    notesT.setAttribute('type', 'text');
    notesT.setAttribute('id', 'notesT'); 

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', 'dueDate');

    let priorityT = createEl('div', 'priorityT');
    priorityT.value = 'medium';

    const confirm = createEl('button', 'confirmTask', 'Confirm');

    taskCardDiv.append(taskTitle, descriptionT, taskPriority, notesT, dueDate, confirm);
    overlay.append(taskCardDiv);
    document.body.append(overlay);

    if(taskToEdit) {
        taskTitle.value = taskToEdit.title;
        descriptionT.value = taskToEdit.description;
        notesT.value = taskToEdit.notes;
        dueDate.value = taskToEdit.dueDate;
        priorityT.value = taskToEdit.priority;
    }

    confirm.addEventListener('click', () => {
        if(taskCardDiv) {};
        const titleValue = taskTitle.value;
        const descValue = descriptionT.value;
        const priorityValue = priorityT.value;
        const notesValue = notesT.value;
        const date = dueDate.value;

        if(taskToEdit) {
            taskToEdit.title = titleValue;
            taskToEdit.description = descValue;
            taskToEdit.priority = priorityValue;
            taskToEdit.notes = notesValue;
            taskToEdit.dueDate = date;

            refreshTasks(projectManager.getActiveProject());
        }
        else {
            if(titleValue === '' ) {
                alert('You must enter the title as well');
                return;
            }
            const activeProject = projectManager.getActiveProject();
    ``
            if(activeProject) {
                const newTask = createTask(
                    titleValue,
                    descValue,
                    priorityValue,
                    notesValue,
                    false,
                    new Date(date),
                );
                
                activeProject.registerTask(newTask);
                renderTask(newTask);
            }
            else {
                alert('You need to choose the project first');
            };
        }
        overlay.remove();
    });
}

const refreshTasks = () => {
    const taskContainer = document.querySelector('#task-container');
    taskContainer.innerHTML = '';
    const activeProject = projectManager.getActiveProject();
    if(activeProject) {
        activeProject.getTasks().forEach(task => renderTask(task));
    }
}