import express from 'express'
const  taskRouter = express.Router();
import { authenticateToken } from '../middlewares/auth.js'


import { getTasks, createTask, findTask, deleteTask, updateTask } from '../controller/task-controller.js';

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', findTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.patch('/:id', updateTask);



export default taskRouter;