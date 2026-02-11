// date-fns format for dueDate
import { format } from 'date-fns';

// exporting functions so that they can be used in index.js
export { projectManager, projectCreator, createTask };

// this is an IIFE that creates an object which holds an array with many different projects
const projectManager = (() =>  {
    let projects = [];
    const registerProject = (project) => projects.push(project);
    const getProject = () => console.log(projects);
    const removeProject = (projectId) => {
        const i = projects.findIndex(p => p.projectId === projectId);
        if(i !== -1) {
            projects.splice(i, 1);
        };
    };

    let activeProject = null;
    const projectStatus = (project) => {
        activeProject = project;
    }
    const getActiveProject = () => activeProject;

    return { get currentProjects() { return projects }, getProject, registerProject, removeProject, activeProject, projectStatus, getActiveProject };
})();

// this factory function in particular makes projects and controlls tasks, basically a task manager and a project creator
const projectCreator = (title) => {    

    let tasks = [];

        const registerTask = (task) => tasks.push(task);
        const getTasks = () => console.log(tasks);
        const activeTask = null;
        const taskStatus = (task) => {
            activeTask = task;
        };
        const getActiveTask = () => activeTask;

        const changeChecklist = (task) => { task.checklist = !task.checklist; };
        const changePriority = (task) => {
            switch(task.priority) {
                case 'low':
                    task.priority = 'medium';
                        break;
                case 'medium':
                    task.priority = 'high';
                    break;
                case 'high':
                    task.priority = 'low';
                    break;
                default: break;
            };
        };
    
    const projectId = crypto.randomUUID(); // added randomUUID because of the ease of deletion
    const removeTask = (taskId) => {
        const i = tasks.findIndex(t => t.taskId === taskId); 
        if(i !== -1) {
            tasks.splice(i, 1);
        };
    };

    return { get currentTasks() { return tasks; }, title, projectId, registerTask, getTasks, changeChecklist, changePriority, removeTask, taskStatus, activeTask, getActiveTask };
}

// another function, this time an IIFE one, which is used for creating tasks
const createTask = ( title, description, priority, notes, checklist, dueDate ) => {
        if(checklist === true) {
            console.log('Task done');
        }
        else { console.log('Task not done'); };
        const taskId = crypto.randomUUID();
        return { title, description, priority, notes, checklist, dueDate, taskId };
};
