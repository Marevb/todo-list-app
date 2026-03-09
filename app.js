document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();

    if (taskText === '') return; 

    const taskObj = {
        text: taskText,
        completed: false
    };

    createTaskElement(taskObj);

    saveTask(taskObj);

    taskInput.value = '';
}

function createTaskElement(taskObj) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.classList.add(taskObj.completed ? 'completed' : 'not-completed');

    li.innerHTML = `
        <div class="cont">
            <input type="checkbox" class="task-checkbox" ${taskObj.completed ? 'checked' : ''}>
            <p>${taskObj.text}</p>
        </div>
        <button class="delete-btn">X</button>
    `;

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('click', () => {
        toggleTask(checkbox);
        updateLocalStorage();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

function toggleTask(checkbox) {
    const li = checkbox.closest('li');
    li.classList.toggle('completed', checkbox.checked);
    li.classList.toggle('not-completed', !checkbox.checked);
}

function saveTask(taskObj) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const text = li.querySelector('p').textContent;
        const completed = li.querySelector('input').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});