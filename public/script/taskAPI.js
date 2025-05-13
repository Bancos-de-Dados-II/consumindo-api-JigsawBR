const baseURL = 'http://localhost:3000/tasks';

const form = document.getElementById('task-form');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const tipoInput = document.getElementById('tipo');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');

let editandoId = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();
  const tipo = tipoInput.value;

  if (!titulo) return;  // Não envia se o título estiver vazio

  if (editandoId) {
    // Atualiza a tarefa se estiver editando
    await updateTask(editandoId, titulo, descricao, false, tipo);
    editandoId = null;
  } else {
    // Cria uma nova tarefa
    await createTask(titulo, descricao, false, tipo);
  }

  tituloInput.value = '';
  descricaoInput.value = ''; // Limpa o campo descrição após envio
  renderTasks();  // Re-renderiza a lista de tarefas
});

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  const tasks = await getTasks();
  const filtradas = tasks.filter(task =>
    task.id.toString() === query ||
    task.titulo.toLowerCase().includes(query) ||
    task.dataHora.startsWith(query)
  );
  renderTasks(filtradas);
});

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  renderTasks();  // Re-renderiza as tarefas sem filtro
});

// Função para renderizar as tarefas no HTML
async function renderTasks(filtradas = null) {
  taskList.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas
  const tasks = filtradas || await getTasks();  // Usa o filtro, se houver

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.concluida ? 'completed' : '';

    const span = document.createElement('span');
    span.innerHTML = `
      <strong>${task.titulo}</strong> (${task.tipo}) 
      - Criado em: ${new Date(task.dataHora).toLocaleString()}
      <br><em>${task.descricao || 'Sem descrição'}</em>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';

    // Botão para marcar/desmarcar como concluída
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.concluida ? 'Desmarcar' : 'Concluir';
    toggleBtn.onclick = async () => {
      await updateTask(task.id, task.titulo, task.descricao, !task.concluida, task.tipo);
      renderTasks();
    };

    // Botão de edição
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      tituloInput.value = task.titulo;
      descricaoInput.value = task.descricao;
      tipoInput.value = task.tipo;
      editandoId = task.id;
    };

    // Botão de exclusão
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.onclick = async () => {
      await deleteTask(task.id);
      renderTasks();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// ----- Funções de API -----

// Pega todas as tarefas
async function getTasks() {
  const res = await fetch(baseURL);
  return res.json();
}

// Cria uma nova tarefa
async function createTask(titulo, descricao, concluida, tipo) {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao, concluida, tipo })
  });
  return res.json();
}

// Atualiza uma tarefa existente
async function updateTask(id, titulo, descricao, concluida, tipo) {
  const res = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao, concluida, tipo })
  });
  return res.json();
}

// Exclui uma tarefa
async function deleteTask(id) {
  await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
}

// ----- Inicialização -----
renderTasks();  // Exibe as tarefas ao carregar a página
