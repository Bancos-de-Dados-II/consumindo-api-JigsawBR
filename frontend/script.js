document.addEventListener("DOMContentLoaded", () => {
  const createTaskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("task-list");
  const taskEditModal = document.getElementById("task-edit-modal");
  const editTitulo = document.getElementById("edit-titulo");
  const editDescricao = document.getElementById("edit-descricao");
  const editTipo = document.getElementById("edit-tipo");
  const editDataHora = document.getElementById("edit-dataHora");
  const saveEditsButton = document.getElementById("save-edits");
  const cancelEditButton = document.getElementById("cancel-edit");
  const searchInput = document.getElementById("search-input");

  let editingTaskId = null;
  let allTasks = [];

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      allTasks = await response.json();
      renderTasks(allTasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const renderTasks = (tasks) => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${task.titulo}</strong> - ${task.tipo}<br>
        <small>${new Date(task.dataHora).toLocaleString()}</small>
        <p>${task.descricao}</p>
        <button onclick="editTask('${task.id}')">Editar</button>
        <button onclick="deleteTask('${task.id}')">Deletar</button>
      `;
      taskList.appendChild(li);
    });
  };

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();
    const filtradas = allTasks.filter((task) =>
      task.titulo.toLowerCase().includes(termo)
    );
    renderTasks(filtradas);
  });

  createTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskData = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      dataHora: document.getElementById("dataHora").value,
      tipo: document.getElementById("tipo").value
    };

    try {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      createTaskForm.reset();
      fetchTasks();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  });

  window.editTask = (taskId) => {
    editingTaskId = taskId;
    fetch(`http://localhost:3000/tasks/${taskId}`)
      .then(res => res.json())
      .then(task => {
        editTitulo.value = task.titulo;
        editDescricao.value = task.descricao;
        editTipo.value = task.tipo;
        editDataHora.value = new Date(task.dataHora).toISOString().slice(0,16);
        taskEditModal.style.display = "block";
      });
  };

  saveEditsButton.addEventListener("click", async () => {
    const updatedTaskData = {
      titulo: editTitulo.value,
      descricao: editDescricao.value,
      tipo: editTipo.value,
      dataHora: editDataHora.value
    };

    try {
      await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });
      taskEditModal.style.display = "none";
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  });

  window.deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  cancelEditButton.addEventListener("click", () => {
    taskEditModal.style.display = "none";
  });

  fetchTasks();
});
