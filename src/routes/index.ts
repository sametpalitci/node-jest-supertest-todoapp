import express from 'express';
import fs from 'fs';
import { fileLocation } from '../constants';
import { Todo } from '../types';
const router = express.Router();

router.get('/todo-list', (_, res) => {
  const getDb: [Todo] = JSON.parse(fs.readFileSync(fileLocation).toString());
  return res.status(200).json(getDb);
});

router.get('/todo-get/:id', (req, res) => {
  const id = req.params.id;
  const getDb: [Todo] = JSON.parse(fs.readFileSync(fileLocation).toString());
  const findTodo = getDb.find((todo) => todo.id === +id);
  if (!findTodo) return res.status(404).json({ status: false });
  return res.status(200).json(findTodo);
});

router.post('/todo-add', (req, res) => {
  const { title, description } = req.body;
  const getDb: [Todo] = JSON.parse(fs.readFileSync(fileLocation).toString());
  const createId = (getDb[getDb.length - 1]?.id || 0) + 1;
  getDb.push({
    id: createId,
    title,
    description,
  });
  fs.writeFileSync(fileLocation, JSON.stringify(getDb));
  return res.status(200).json({ status: true, id: createId });
});

router.put('/todo-update', (req, res) => {
  const { id, newTitle, newDescription } = req.body;
  const getDb: [Todo] = JSON.parse(fs.readFileSync(fileLocation).toString());
  let findTodo = getDb.find((todo) => todo.id === id);
  if (!findTodo) return res.status(404).json({ status: false });
  findTodo = {
    id: findTodo.id,
    title: newTitle || findTodo.title,
    description: newDescription || findTodo.description,
  };
  const extractTodoFromList = getDb.filter((todo) => todo.id !== id);
  extractTodoFromList.push(findTodo);
  fs.writeFileSync(fileLocation, JSON.stringify(extractTodoFromList));
  return res.status(200).json({ status: true });
});

router.delete('/todo-delete', (req, res) => {
  const { id } = req.body;
  const getDb: [Todo] = JSON.parse(fs.readFileSync(fileLocation).toString());
  const findTodo = getDb.find((todo) => todo.id === id);
  if (!findTodo) return res.status(404).json({ status: false });
  const extractTodoFromList = getDb.filter((todo) => todo.id !== id);
  fs.writeFileSync(fileLocation, JSON.stringify(extractTodoFromList));
  return res.status(200).json({ status: true });
});

export default router;
