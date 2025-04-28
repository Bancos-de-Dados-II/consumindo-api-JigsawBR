import Task from '../model/task.js';

export async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({
      where: { UsuarioId: req.user.id } // <- só pega as tarefas do usuário logado
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar tarefas" });
  }
}

export async function createTask(req, res) {
  try {
    const { titulo, descricao, tipo } = req.body;

    const newTask = await Task.create({
      titulo,
      descricao,
      tipo,
      UsuarioId: req.user.id, // <- vincula a tarefa ao usuário logado
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Erro ao criar a tarefa" });
  }
}

export async function findTask(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findOne({
      where: {
        id,
        UsuarioId: req.user.id // <- garante que o usuário só veja a sua tarefa
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar tarefa" });
  }
}

export async function deleteTask(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findOne({
      where: {
        id,
        UsuarioId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await task.destroy();
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao deletar tarefa" });
  }
}

export async function updateTask(req, res) {
  const id = req.params.id;
  try {
    const task = await Task.findOne({
      where: {
        id,
        UsuarioId: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await task.set(req.body);
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Falha ao atualizar tarefa" });
  }
}
