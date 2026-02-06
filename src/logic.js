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


const projectManager = (project) =>  {
    let projects = [];
    const registerProject = (project) => projects.push(project.title, project.tasks);
    const getProject = (project) => console.log(project);

    return { projects, getProject, registerProject };
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
    
        // need to make a remove task function;
    
    return { title, tasks, registerTask, getTasks, changeChecklist, changePriority };
}


const createTask = (() => {
    const taskObject = (title, description, priority, notes, checklist) => {
        if(checklist === true) {
            console.log('Task done');
        }
        else { console.log('Task not done'); };
        return { title, description, priority, notes, checklist };
    };
    return { taskObject };
})();

const task1 = createTask.taskObject('Yes', 'Harry Maguire', 'low', 'Funny', true);
const title1 = 'Milos';
const project1 = projectCreator(title1);
project1.registerTask(task1);
let projectList = projectManager(project1);
projectList.registerProject(project1);

const task2 = createTask.taskObject('No', 'Lissandro Martinez', 'high', 'Not funny', false);
const title2 = 'Milos';
const project2 = projectCreator(title2);
project2.registerTask(task2);
projectList.registerProject(project2);

project2.changePriority(task2);
console.log(projectList.projects);