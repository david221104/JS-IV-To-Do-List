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


const projectManager = (() =>  {
    let projects = [];
    const registerProject = (project) => projects.push(project);
    const getProject = (project) => console.log(project);

    return { getProject, registerProject };
})();


const projectCreator = (() => {    

    const createProject = (title, taskArray) => {
        return { title, taskArray };
    }
    
    const registerTask = (task) => tasks.push(task);
    const getTask = (task) => console.log(task);
    const changeCheckList = (task) => (task.checklist === true) ? false : true;
    const changePriority = (task) => {
        switch(task.priority) {
            case 'low':
                checklist.priority = 'medium';
                break;
            case 'medium':
                checklist.priority = 'high';
                break;
            case 'high':
                checklist.priority = 'low';
                break;
            default: break;
        };
    };

    // need to make a remove task function;

    return { getTask, registerTask, changePriority, changeCheckList, createProject };
})();

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


// I need a function to be able to manipulate the tasks after the projec has been created, meaning - I make a project, I make a function that can be called to create a task which will push it inside the array

// const makeShake = createTask.taskObject('Make a milk shake', 'This is about eating as much peanutbutter and banana as possible', 'high', 'Well I have to make a good deal out of this. It is not as strong as I thought it would be.', false);
// const studyTime = createTask.taskObject('Study', 'I need to study for at least 5 hours today', 'low', 'It needs to be done within 20 days from now, so who cares)', false);
