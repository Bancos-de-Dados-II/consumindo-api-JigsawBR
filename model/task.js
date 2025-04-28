import sequelize from "../database/sequelize.js";
import { DataTypes, DATE} from "sequelize";
import User from './user.js';

const Task = sequelize.define('Task', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UsuarioId: { // 👈 chave estrangeira para o dono da tarefa
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


Task.sync();

export default Task;