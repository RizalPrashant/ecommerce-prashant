const Item = require('../models/Item');

const addItem = async (req , res ) => {
    const { title, description, listeddate } = req.body;
    try {
        const newItem = await Item.create({ userId: req.user.id, title, description, listeddate });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    const getItems = async (req , res ) => {
        try {
            const items = await Item.find({ userId: req.user.id });
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const updateItem = async (req , res ) => {
        const { title, description, instock, listeddate } = req.body;
        try {
            const item = await Item.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            item.title = title || Item.title;
            item.description = description || Item.description;
            item.instock = instock ?? Item.instock;
            item.listeddate = listeddate || Item.listeddate;
            const updatedItem = await Item.save();
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        const deleteItem = async (req , res ) => {
            try {
                const item = await Item.findById(req.params.id);
                if (!item) return res.status(404).json({ message: 'Item not found' });
                await item.remove();
                res.json({ message: 'Item deleted' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            };
            

module.exports = { getItems, addItem, updateItem, deleteItem };    