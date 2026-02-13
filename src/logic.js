// exporting functions so that they can be used in index.js
export { projectManager, projectCreator, createTask };

// this is an IIFE that creates an object which holds an array with many different projects
const projectManager = (() =>  {
    let projects = [];
    const registerProject = (project) => projects.push(project);
    const getProjects = () => console.log(projects);
    const removeProject = (projectId) => {
        const i = projects.findIndex(p => p.projectId === projectId);
        if(i !== -1) {
            projects.splice(i, 1);
        };
    };

    const loadProjects = (data) => {
        projects = data.map(savedProject => {
            const revived = projectCreator(savedProject.title);

            revived.projectId = savedProject.projectId;    
            if(savedProject.currentTasks) {
                revived.setTasks(savedProject.currentTasks);
            }

            return revived;
        });
    };

    const saveActiveProject = () => {
    if (activeProject) {
        localStorage.setItem('activeProjectId', activeProject.projectId);
    } else {
        localStorage.removeItem('activeProjectId');
    }
};

const loadActiveProject = () => {
    const activeId = localStorage.getItem('activeProjectId');
    if (activeId) {
        activeProject = projects.find(p => p.projectId === activeId);
    }
};

    let activeProject = null;
    const projectStatus = (project) => {
        activeProject = project;
    }
    const getActiveProject = () => activeProject;
    const saveProjects = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    return { get currentProjects() { return projects }, getProjects, registerProject, removeProject, activeProject, 
            projectStatus, getActiveProject, saveProjects, saveProjects, loadProjects, saveActiveProject, loadActiveProject };
})();

// this factory function in particular makes projects and controlls tasks, basically a task manager and a project creator
const projectCreator = (title) => {    

    let tasks = [];

        const registerTask = (task) => tasks.push(task);
        const getTasks = () => tasks;

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
    
    const setTasks = (loadedTasks) => {
        tasks = loadedTasks;
    } 
     
    const projectId = crypto.randomUUID(); // added randomUUID because of the ease of deletion
    const getTaskId = () => taskId;
    const removeTask = (taskId) => {
        const i = tasks.findIndex(t => t.taskId === taskId); 
        if(i !== -1) {
            tasks.splice(i, 1);
        };
    };

    return { get currentTasks() { return tasks; }, title, projectId, registerTask, getTasks, 
             changeChecklist, changePriority, removeTask, getTaskId, setTasks };
}

// another function, this time an IIFE one, which is used for creating tasks
const createTask = ( title, description, priority, notes, checklist, dueDate ) => {
        checklist = false;
        const taskId = crypto.randomUUID();
        return { title, description, priority, notes, checklist, dueDate, taskId };
};
