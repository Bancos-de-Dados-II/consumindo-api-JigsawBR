document.addEventListener("DOMContentLoaded", () => {
    const createTaskForm = document.getElementById("create-task-form");
    const taskList = document.getElementById("task-list");
    const taskEditModal = document.getElementById("task-edit-modal");
    const editTitulo = document.getElementById("edit-titulo");
    const editDescricao = document.getElementById("edit-descricao");
    const editTipo = document.getElementById("edit-tipo");
    const saveEditsButton = document.getElementById("save-edits");
    const cancelEditButton = document.getElementById("cancel-edit");

    let editingTaskId = null;

    // Função para buscar e listar todas as tarefas
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks');
            const tasks = await response.json();
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${task.titulo}</strong> - ${task.tipo}
                    <p>${task.descricao}</p>
                    <button class="edit-btn" data-id="${task.id}">Editar</button>
                    <button class="delete-btn" data-id="${task.id}">Deletar</button>
                `;
                taskList.appendChild(li);
            });

            // Adicionar listeners para os botões
            const editButtons = document.querySelectorAll(".edit-btn");
            const deleteButtons = document.querySelectorAll(".delete-btn");

            editButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const taskId = e.target.getAttribute('data-id');
                    editTask(taskId);
                });
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const taskId = e.target.getAttribute('data-id');
                    deleteTask(taskId);
                });
            });

        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    // Função para criar nova tarefa
    createTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskData = {
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value,
            tipo: document.getElementById("tipo").value
        };

        try {
            await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            fetchTasks(); // Atualiza a lista de tarefas
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    });

    // Função para editar tarefa
    const editTask = (taskId) => {
        editingTaskId = taskId;
        fetch(`http://localhost:3000/tasks/${taskId}`)
            .then(res => res.json())
            .then(task => {
                editTitulo.value = task.titulo;
                editDescricao.value = task.descricao;
                editTipo.value = task.tipo;
                taskEditModal.style.display = 'block';
            });
    };

    // Função para salvar edições
    saveEditsButton.addEventListener('click', async () => {
        const updatedTaskData = {
            titulo: editTitulo.value,
            descricao: editDescricao.value,
            tipo: editTipo.value,
        };

        try {
            await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            });
            taskEditModal.style.display = 'none';
            fetchTasks(); // Atualiza a lista de tarefas
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    });

    // Função para deletar tarefa
    const deleteTask = async (taskId) => {
        try {
            await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'DELETE',
            });
            fetchTasks(); // Atualiza a lista de tarefas
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    // Função para cancelar edição
    cancelEditButton.addEventListener('click', () => {
        taskEditModal.style.display = 'none';
    });

    // Inicializa a lista de tarefas
    fetchTasks();
});