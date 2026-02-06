/* 

I: YOUR PROJECTS
1. It should be able to list all my projects
2. Meaning it should have an array of titles for that part
3. Automatically an object should be created
3. Each object should be represented as a name, and have its own delete and priority icons 
4. It should contain a function to create projects


II: projectCreator
1. This function creates a project and manages it 

III: createTask 
1. The primary role of this function is to add task details into an object
2. It has a function taskCreator, which takes user input and makes an object out of it


*/
import { format } from 'date-fns';

const projectManager = (project) =>  {
    let projects = [];
    const registerProject = (project) => projects.push(project);
    const getProject = (project) => console.log(project);
    const removeProject = (projectId) => {
        const i = projects.findIndex(p => p.projectId === projectId);
        if(i !== -1) {
            projects.splice(i, 1);
        };
    };


    return { projects, getProject, registerProject, removeProject };
};


const projectCreator = (title) => {    

    let tasks =  [];

        const registerTask = (task) => tasks.push(task);
        const getTasks = () => console.log(tasks);
            
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
    
    const projectId = crypto.randomUUID();
    const removeTask = (taskId) => {
        const i = tasks.findIndex(t => t.taskId === taskId);
        if(i !== -1) {
            tasks.splice(i, 1);
        };
    };

    return { title, tasks, projectId, registerTask, getTasks, changeChecklist, changePriority, removeTask };
}


const createTask = (() => {
    const taskObject = (title, description, priority, notes, checklist, dueDate) => {
        if(checklist === true) {
            console.log('Task done');
        }
        else { console.log('Task not done'); };
        const prettyDate = format(dueDate, 'dd.MM.yyyy');
        const taskId = crypto.randomUUID();
        return { title, description, priority, notes, checklist, dueDate: prettyDate, taskId };
    };
    return { taskObject };
})();

const task1 = createTask.taskObject('Yes', 'Harry Maguire', 'low', 'Funny', true, new Date());
const title1 = 'Milos';
const project1 = projectCreator(title1);
project1.registerTask(task1);
let projectList = projectManager(project1);
projectList.registerProject(project1);

const task2 = createTask.taskObject('No', 'Lissandro Martinez', 'high', 'Not funny', false, new Date());
const title2 = 'Milos';
const project2 = projectCreator(title2);
project2.registerTask(task2);
projectList.registerProject(project2);

project2.changePriority(task2);

projectList.removeProject(project1.projectId);
console.log(projectList.projects);
