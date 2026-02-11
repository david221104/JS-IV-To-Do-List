import { projectManager, projectCreator, createTask } from './logic.js';
export { renderTaskCard, renderTask, refreshTasks }

const taskContainer = document.querySelector('#task-container');

function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}

const renderTask = (newTask) => {
    const taskDiv = createEl('div', 'taskDiv');
    const renderTitle = createEl('p', 'renderTitle', newTask.title);
    const renderDesc = createEl('p', 'renderDesc', newTask.description);
    const renderPriority = createEl('p', 'renderPriority', newTask.priority);
    const renderNotes = createEl('p', 'renderNotes', newTask.notes);
    const renderChecklist = createEl('p', 'renderChecklist', newTask.checklist);
    const renderDate = createEl('p', 'renderDate', newTask.dueDate);
    const editButton = createEl('button', 'editButton', 'Edit');
    const removeTask = createEl('button', 'removeTask', 'X');

    taskDiv.append(renderTitle, renderDesc, renderPriority, renderNotes, renderChecklist, renderDate, editButton, removeTask);
    taskContainer.append(taskDiv);

    const taskDivs = document.querySelectorAll('.taskDiv');
    taskDivs.forEach(element => element.style.borderLeft = '1px solid #6b7f09');

    editButton.addEventListener('click', () => {
        renderTaskCard(newTask);
    }); 
    
    removeTask.addEventListener('click', () => {
        const activeProject = projectManager.getActiveProject();
        activeProject.removeTask(newTask.taskId);

        refreshTasks();
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

    taskCardDiv.append(taskTitle, descriptionT, taskPriority, notesT, confirm);
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