import express from 'express';
import cors from 'cors';
import TaskRouter from './router/task-router.js';
import UserRouter from './router/user-router.js'; // Rota de usuário

const app = express();
const port = 3000;

// Middleware de CORS para permitir requisições de diferentes origens
app.use(cors());

// Middleware para analisar corpo das requisições (JSON)
app.use(express.json());

// Rota estática para arquivos públicos
app.use('/public', express.static('public'));

// Rota para tarefas
app.use('/tasks', TaskRouter);

// Rota para usuários
app.use('/users', UserRouter); // Assegure-se de ter um arquivo user-router.js para lidar com isso

app.listen(port, () => {
  console.log(`App de exemplo está rodando na porta ${port}`);
});
