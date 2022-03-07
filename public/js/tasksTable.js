const tableBtns = document.querySelectorAll('.table-btn');
const employeeTaskTables = document.querySelectorAll('.tasks-table');
const taskRows = document.querySelectorAll('.task-row');
const taskTitleElement = document.querySelector('#task-title');
const taskDeadlineElement = document.querySelector('#task-deadline');
const taskStatusElement = document.querySelector('#task-status');
const taskDescriptionElement = document.querySelector('#task-description');
const cancelTaskUpdateBtn = document.querySelector('.cancel-update-task');
const updateTaskForm = document.querySelector('.update-task-form');

function closeViewTaskModal() {
  const element = document.getElementById('modalTaskDetails');
  element.classList.remove('is-active');
}

function openViewTaskModal() {
  const element = document.getElementById('modalTaskDetails');
  element.classList.add('is-active');
}

tableBtns.forEach((tableBtn) =>
  tableBtn.addEventListener('click', (event) => {
    const { id } = event.currentTarget.dataset;
    tableBtns.forEach((tableBtn) => {
      tableBtn.classList.remove('is-active');
    });
    event.currentTarget.classList.add('is-active');
    employeeTaskTables.forEach((table) => {
      table.classList.remove('active');
    });
    const selectedTable = document.querySelector(`#${id}`);
    selectedTable.classList.add('active');
  })
);

taskRows.forEach((taskRow) => {
  taskRow.addEventListener('click', async (event) => {
    const taskID = event.currentTarget.dataset.id;
    const response = await fetch(`/api/tasks/${taskID}`);
    const taskData = await response.json();
    taskTitleElement.value = taskData.task_title;
    taskDeadlineElement.value = taskData.task_deadline;
    taskDescriptionElement.value = taskData.task_description;
    switch (taskData.status) {
      case 'completed':
        taskStatusElement.selectedIndex = 3;
        break;
      case 'in_progress':
        taskStatusElement.selectedIndex = 2;
        break;
      default:
        taskStatusElement.selectedIndex = 1;
        break;
    }
    openViewTaskModal();
    updateTaskForm.dataset.id = taskID;
  });
});

async function updateTaskFormHandler(event) {
  event.preventDefault();

  const taskID = updateTaskForm.dataset.id;
  const taskTitle = taskTitleElement.value.trim();
  const taskDeadline = taskDeadlineElement.value.trim();
  const taskDescription = taskDescriptionElement.value.trim();
  const taskStatus = taskStatusElement.options[
    taskStatusElement.selectedIndex
  ].value
    .toLowerCase()
    .replace(' ', '_');
  if (taskTitle && taskDeadline && taskDescription && taskStatus) {
    const response = await fetch(`/api/tasks/${taskID}`, {
      method: 'PATCH',
      body: JSON.stringify({
        task_title: taskTitle,
        task_deadline: taskDeadline,
        task_description: taskDescription,
        status: taskStatus,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
      alert('Task updated succesfully!');
    } else {
      alert(response.statusText);
    }
  }
}

updateTaskForm.addEventListener('submit', updateTaskFormHandler);
cancelTaskUpdateBtn.addEventListener('click', closeViewTaskModal);
