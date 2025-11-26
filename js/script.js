let tasks = [];

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const deleteAll = document.getElementById("deleteAll");

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter.value === "pending") {
    filteredTasks = tasks.filter((t) => !t.done);
  } else if (filter.value === "done") {
    filteredTasks = tasks.filter((t) => t.done);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = `
      <tr>
        <td>${task.name}</td>
        <td>${task.date}</td>
        <td class="${task.done ? "status-done" : "status-pending"}">
          ${task.done ? "Done" : "Pending"}
        </td>
        <td>
          <button class="action-btn" onclick="toggleStatus(${index})">✓</button>
          <button class="action-btn delete-btn" onclick="deleteTask(${index})">X</button>
        </td>
      </tr>
    `;
    taskList.innerHTML += row;
  });
}

function addTask() {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (name === "") {
    alert("Task cannot be empty!");
    return;
  }
  if (date === "") {
    alert("Date must be selected!");
    return;
  }

  tasks.push({ name, date, done: false });

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

function toggleStatus(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

deleteAll.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

addBtn.addEventListener("click", addTask);
filter.addEventListener("change", renderTasks);

renderTasks();
