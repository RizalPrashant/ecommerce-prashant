const Task = require('../models/Items');

const addItems = async (req , res ) => {
    const { title, description, deadline } = req.body;
    try {
        const task = await Task.create({ userId: req.user.id, title, description, deadline });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    const getItems = async (req , res ) => {
        try {
            const tasks = await Task.find({ userId: req.user.id });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    