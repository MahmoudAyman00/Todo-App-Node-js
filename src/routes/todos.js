const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

const mongoose = require('mongoose');


const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById
} = require('../controllers/todo.controller');

// create a new todo
router.post('/todos', createTodo);

// get all todos
router.get('/todos', getAllTodos);

// get a single todo by id
router.get('/todos/:id', getTodoById);

// update a todo by id
router.put('/todos/:id', updateTodoById);

// delete a todo by id
router.delete('/todos/:id', deleteTodoById);

module.exports = router;