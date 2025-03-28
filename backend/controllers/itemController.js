const Item = require('../models/Item');

// Add Item Method for the ecommerce application.
const addItem = async (req , res ) => {
    const { title, description, listeddate } = req.body;
    try {
        const newItem = await Item.create({ userId: req.user.id, title, description, listeddate });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    // Get Items method for the ecommerce application.
    const getItems = async (req , res ) => {
        try {
            const items = await Item.find({ userId: req.user.id });
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //Update Item method for the ecommerce application.
    const updateItem = async (req , res ) => {
        const { title, description, instock, listeddate } = req.body;
        try {
            const item = await Item.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            item.title = title || item.title;
            item.description = description || item.description;
            item.instock = instock ?? item.instock;
            item.listeddate = listeddate || item.listeddate;
            const updatedItem = await item.save();
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        //Delete Item method for the ecommerce application.
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