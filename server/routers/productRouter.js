import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/', 
    expressAsyncHandler(async (req, res) => {
        const seller = req.query.seller || '';
        const sellerFilter = seller ? { seller } : {};
        const products = await Product.find({ ...sellerFilter }).populate(
            'seller', 
            'seller.name seller.logo'
        );
        res.send(products);
    })
);

productRouter.get(
    '/seed', 
    expressAsyncHandler(async(req, res) => {
        // await Product.remove({})
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

productRouter.get(
    '/:id', 
    expressAsyncHandler(async (req, res) => {
        const product = await (await Product.findById(req.params.id)).populated(
            'seller',
            'seller.name seller.logo seller.rating seller.numReviews'
        );
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post(
    '/', 
    isAuth, 
    isSellerOrAdmin, 
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'sample name' + Date.now(),
            seller: req.user._id,
            category: 'sample category',
            image: '/image/p1.jpg',
            price: 0,
            countInStock: 0,
            brand: 'sample brand',
            rating: 0,
            numReviews: 0,
            description: 'sample description',
            featured: false
        });
        const createdProduct = await product.save();
        res.send({  message: 'Product Created', product: createdProduct });
    })
);

productRouter.put(
    '/:id', 
    isAuth, 
    isSellerOrAdmin, 
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product) {
            product.name = req.body.name;            
            product.category = req.body.category;
            product.image = req.body.image;
            product.price = req.body.price;
            product.countInStock = req.body.countInStock;
            product.brand = req.body.brand;
            product.description = req.body.description;
            product.featured = req.body.featured;
            const updatedProduct = await product.save();
            res.send({message: 'Product Updated', product: updatedProduct});
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.delete(
    '/:id', 
    isAuth, 
    isAdmin, 
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        if(product) {
            const deleteProduct = await product.remove();
            res.send({message: 'Product Deleted', product: deleteProduct});
        } else {
            res.status(404).send({message: 'Product Not Found'});
        }
    })
);

export default productRouter;