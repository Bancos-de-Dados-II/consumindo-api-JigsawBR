import express from 'express'
import cors from 'cors'
import authRoutes from './router//authRouter.js';
import taskRouter from './router/task-router.js'
import usersRouter from './router/users-router.js'
import User from './model/user.js';
import Task from './model/task.js';
import User from './model/user.js';

const port = 3000
const app = express()

User.hasMany(Task, { foreignKey: 'UsuarioId' });
Task.belongsTo(User, { foreignKey: 'UsuarioId' });


app.use(express.json());
app.use(cors());
app.use('/tasks', taskRouter);
app.use('/tasks', taskRouter);
app.use('/users', usersRouter);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

