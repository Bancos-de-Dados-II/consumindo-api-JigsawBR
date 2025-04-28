const API = 'localhost:3000/tasks'

const titulo = document.getElementById('titulo')
const tarefa = document.getElementById('tarefa')
const descricao = document.getElementById('descricao')

async function fetchTasks() {
    const res = await fetch(API);
    const tasks = await res.json()
}


