import mongoose from "mongoose";
import products from './data.js';
import Product from '../models/product.js';

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shopaholic")

        await Product.deleteMany();
        console.log('Produts are deleted');

        await Product.insertMany(products);
        console.log('Produts are added');
        
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();