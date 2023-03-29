// Get task form and task list elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
renderTasks();

// Add task on form submit
taskForm.addEventListener('submit', e => {
	e.preventDefault();
	const taskInput = document.getElementById('task-input');
	const taskText = taskInput.value.trim();
	if (taskText) {
		addTask(taskText);
		taskInput.value = '';
	}
});

// Add task to tasks array and render tasks
function addTask(taskText) {
	const task = { id: Date.now(), text: taskText };
	tasks.push(task);
	saveTasks();
	renderTasks();
}

// Render 
function renderTasks() {
	taskList.innerHTML = '';
	tasks.forEach(task => {
		const taskEl = document.createElement('li');
		taskEl.classList.add('task');
		if (task.completed) {
			taskEl.classList.add('completed');
		}
		taskEl.innerHTML = `
			<label for="task-${task.id}" class="task-text">${task.text}</label>
			<button type="button" class="check-btn fa fa-check" data-id="${task.id}"></button>
			<button type="button" class="delete-btn fa fa-trash-o" data-id="${task.id}"></button>
		`;
		taskList.appendChild(taskEl);
	});
}

// Check task as completed and render tasks
taskList.addEventListener('click', e => {
	if (e.target.classList.contains('check-btn')) {
		const taskId = e.target.getAttribute('data-id');
		tasks.forEach(task => {
			if (task.id === parseInt(taskId)) {
				task.completed = !task.completed;
			}
		});
		saveTasks();
		renderTasks();
	} else if (e.target.classList.contains('delete-btn')) {
		const taskId = e.target.getAttribute('data-id');
		tasks = tasks.filter(task => task.id !== parseInt(taskId));
		saveTasks();
		renderTasks();
	}
});

// Save tasks to localStorage
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
