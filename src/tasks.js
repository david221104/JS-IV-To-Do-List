export { renderTask };
import { createEl } from './projects.js';

const t = document.querySelector('#your-tasks');

function renderTask () {
    const taskDiv = createEl('div', 'taskDiv');
    const titleT = createEl('p', 'titleP', title);
    const removeTIcon = createEl('div', 'removeTIcon');
    const statusT = createEl('div', 'statusT');

    taskDiv.append(titleT, statusT, removeTIcon); 
    t.append(taskDiv);
}

