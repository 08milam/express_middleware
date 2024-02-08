const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data for the shopping list
let items = [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
];

// Route to render a list of shopping items
app.get('/items', (req, res) => {
    res.json(items);
});

// Route to add an item to the shopping list
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
});

// Route to display a single item's name and price
app.get('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const item = items.find(item => item.name === itemName);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Route to modify a single item's name and/or price
app.patch('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const updatedItem = req.body;
    const index = items.findIndex(item => item.name === itemName);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        res.json({ updated: items[index] });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Route to delete a specific item from the array
app.delete('/items/:name', (req, res) => {
    const itemName = req.params.name;
    const index = items.findIndex(item => item.name === itemName);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: "Deleted" });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
