import sequelize from "../database/sequelize.js";
import { DataTypes} from "sequelize";

const User = sequelize.define(
  'Users', 
  {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.sync();

export default User;