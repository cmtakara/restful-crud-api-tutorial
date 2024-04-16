const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const Product = require('./models/productModel')

// this middleware is required to be able to accept and parse the json body of our requests
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.get('/', (req, res) => {
    res.send('hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello, you have reached the blog route')
});

app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});        
    }
})

app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'this product cannot be found'});
        }
        res.status(200).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
})

app.post('/api/product', async (req, res) => {
    // console.log(req.body);
    // res.json(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
})

// update the product in the database
app.put('/api/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
        // no product in database was updated
        if (!product) {
            return res.status(404).json({message: 'cannot find product'});
        } 
        res.status(200).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
})

mongoose.connect(mongoURI)
.then(() => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`node api app is running on port ${PORT}`)
    })
})
.catch((error) => {console.log(error)})