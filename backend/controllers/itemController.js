const Item = require('../models/Item');

const addItem = async (req , res ) => {
    const { title, description, listeddate } = req.body;
    try {
        const Item = await Item.create({ userId: req.user.id, title, description, listeddate });
        res.status(201).json(Item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    const getItems = async (req , res ) => {
        try {
            const Items = await Item.find({ userId: req.user.id });
            res.json(Items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const updateItem = async (req , res ) => {
        const { title, description, instock, listeddate } = req.body;
        try {
            const Item = await Item.findById(req.params.id);
            if (!Item) return res.status(404).json({ message: 'Item not found' });
            Item.title = title || Item.title;
            Item.description = description || Item.description;
            Item.instock = instock ?? Item.instock;
            Item.listeddate = listeddate || Item.listeddate;
            const updatedItem = await Item.save();
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        const deleteItem = async (req , res ) => {
            try {
                const Item = await Item.findById(req.params.id);
                if (!Item) return res.status(404).json({ message: 'Item not found' });
                await Item.remove();
                res.json({ message: 'Item deleted' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            };
            

module.exports = { getItems, addItem, updateItem, deleteItem };    