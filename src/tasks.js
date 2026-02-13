import { projectManager, projectCreator, createTask } from './logic.js';
export { renderTaskCard, renderTask, refreshTasks, setLocalStorage };

// date-fns format for dueDate
import { format } from 'date-fns';

const taskContainer = document.querySelector('#task-container');

function setLocalStorage() {
    projectManager.saveProjects();
}


function createEl(tag, className, text = '') {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(text) element.textContent = text;
    return element;
}


// Function to render a task

const renderTask = (newTask) => {
    const taskDiv = createEl('div', 'taskDiv');
    const checklistText = newTask.checklist ? 'Checklist: Done' : 'Chcecklist: Not done';
    const renderChecklist = createEl('p', 'renderChecklist', checklistText);
    const renderTitle = createEl('p', 'renderTitle', `Title: ${newTask.title}`);
    const renderDate = createEl('div', 'renderDate');
    if(newTask.checkList) {
        renderChecklist.style.backgroundColor = 'green';
    }
    if(newTask.dueDate) {
        const dateObj = new Date(newTask.dueDate);
        if (!isNaN(dateObj.getTime())) {
            renderDate.textContent = 'Due date: ' + format(dateObj, 'dd.MM.yyyy');
        } else {
            renderDate.textContent = 'Due date: invalid';
        }
    } else {
        renderDate.textContent = 'No due date';
    }
    const editButton = createEl('button', 'editButton', 'Edit');
    const removeTask = createEl('button', 'removeTask', 'X');
    
    const priorityDiv = createEl('div', 'priorityDiv');
    const priorityText = createEl('p', '', 'Priority: ');
    const prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'prioritySelect');
    ['low', 'medium', 'high'].forEach(prio => {
        const option = document.createElement('option');
        option.value = prio;
        option.textContent = prio.charAt(0).toUpperCase() + prio.slice(1);
        if (prio === 'medium') option.selected = true; // Default
        prioritySelect.appendChild(option);
    });
    priorityDiv.append(priorityText)
    if(newTask.priority === 'high') {
        priorityDiv.style.backgroundColor = 'red';
    }
    else if (newTask.priority === 'medium') {
        priorityDiv.style.backgroundColor = 'orange';
    }
    else if (newTask.priority === 'high') {
        priorityDiv.style.backgroundColor = 'green';
    }

    const noDetails = createEl('div', 'noDetails');
    noDetails.append(renderTitle, renderChecklist, renderDate, priorityDiv, editButton, removeTask);
    taskDiv.append(noDetails);
    taskContainer.append(taskDiv);

    const taskDivs = document.querySelectorAll('.taskDiv');
    taskDivs.forEach(element => element.style.borderLeft = '1px solid #6b7f09');

    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        renderTaskCard(newTask);
        setLocalStorage();
        refreshTasks();
    }); 
    
    removeTask.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeProject = projectManager.getActiveProject();
        activeProject.removeTask(newTask.taskId); 
        setLocalStorage();
        refreshTasks();
    });

    renderChecklist.addEventListener ('click', (e) => {
        e.stopPropagation();
        const activeProject = projectManager.getActiveProject();
        if(newTask.checklist === false) {
            activeProject.changeChecklist(newTask);
            renderChecklist.textContent = 'Checklist: Done';
            renderChecklist.style.backgroundColor = 'green';
        }
        else {
            activeProject.changeChecklist(newTask);
            renderChecklist.textContent = 'Checklist: Not done';
            renderChecklist.style.backgroundColor = 'red';
        }
        setLocalStorage();
        refreshTasks();
    });

    priorityDiv.addEventListener('click', (e) => {
        e.stopPropagation(); 
    
        const activeProject = projectManager.getActiveProject();
        
        activeProject.changePriority(newTask);        
        setLocalStorage();
        refreshTasks();
    });

    // Event listener for expanding the task bar
    // taskDiv is added the detail expanded, but if it does already have one, it gets removed, along with the details div

    taskDiv.addEventListener('click', (e) => {
        if(taskDiv.classList.contains('expanded')) {
            const existingDetails = taskDiv.querySelector('.tasks-details');
            if(existingDetails) {
                existingDetails.remove();
                setLocalStorage();
                refreshTasks();
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
            setLocalStorage();
            
        }
    });

};



// Function to render task card

const renderTaskCard = (taskToEdit = null) => {

    const overlay = createEl('div', 'overlay');

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.remove();
        }
    });

    const taskCardDiv = createEl('div', 'taskCardDiv');

    const taskTitleDiv = createEl('div', 'taskTitleDiv');
    const taskTitleText = createEl('p', 'taskTitleText', 'Title: ');
    const taskTitle = document.createElement('input');
    taskTitle.setAttribute('type', 'text');
    taskTitle.setAttribute('id', 'taskTitle');
    taskTitleDiv.append(taskTitleText, taskTitle);

    const descriptionTDiv = createEl('div', 'descriptionTDiv');
    const descriptionTText = createEl('p', 'descriptionTText', 'Description: ');
    const descriptionT = document.createElement('textArea');
    descriptionT.setAttribute('id', 'descriptionT'); 
    descriptionTDiv.append(descriptionTText, descriptionT);

    const notesTDiv = createEl('div', 'notesTDiv');
    const notesTText = createEl('p', 'notesTText', 'Notes: ');
    const notesT = document.createElement('input');
    notesT.setAttribute('type', 'text');
    notesT.setAttribute('id', 'notesT'); 
    notesTDiv.append(notesTText, notesT);

    const dueDateDiv = createEl('div', 'dueDateDiv');
    const dueDateText = createEl('p', 'dueDateText', 'Select due date: ');
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', 'dueDate');
    dueDateDiv.append(dueDateText, dueDate);

    let priorityT = createEl('div', 'priorityT');
    priorityT.value = 'medium';

    const confirm = createEl('button', 'confirmTask', 'Confirm');
    taskCardDiv.append(taskTitleDiv, notesTDiv, dueDateDiv, descriptionTDiv, confirm);
    overlay.append(taskCardDiv);
    document.body.append(overlay);

    // If this task is for editing then make new vars with the same values as previous ones 

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

        // if there needs to be editing, then assign values 
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
            // if it is active project, then make the object and put it in the tasks[] with the registerTask
            if(!activeProject) {
                alert('No project selected!');
            }
             let finalDueDate = date ? new Date(date) : null;
            if (finalDueDate && isNaN(finalDueDate.getTime())) finalDueDate = null;
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
                setLocalStorage();
                refreshTasks();
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
    if (!taskContainer) return;

    taskContainer.innerHTML = '';

    const active = projectManager.getActiveProject();
    if (!active) return;

    const tasks = active.currentTasks || active.tasks || [];

    tasks.forEach(task => renderTask(task));
};