import express from 'express'
const  usersRouter = express.Router();

import { createUsers, deleteUsers, findUsers, getUsers, updateUsers } from '../controller/users-controller.js';

usersRouter.post('/', createUsers);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', findUsers);
usersRouter.delete('/:id', deleteUsers);
usersRouter.patch('/:id', updateUsers);


export default usersRouter;