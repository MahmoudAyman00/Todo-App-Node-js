const Todo = require('../models/Todo');
const mongoose = require('mongoose');


const createTodo = async (req, res) => {
    try {
    const {title ,completed }= req.body; 
    if(!title || title.trim() === '' || typeof title !== 'string') {
        return res.status(400).json({ message: 'Title is required and must be a non-empty string' });}
        const todo = new Todo({ title, completed });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const updates = {};
        if (title !== undefined) {
            updates.title = typeof title === 'string' ? title.trim() : title;
        }
        if (completed !== undefined) {
            updates.completed = completed === true;
        }
        
        const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (req.body.title && (req.body.title.trim() === '' || typeof req.body.title !== 'string')) {
            return res.status(400).json({ message: 'Title must be a non-empty string' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTodoById =async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById
};