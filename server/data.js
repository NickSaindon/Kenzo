import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Nick',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'high quality product',
            featured: true
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 1.0,
            numReviews: 10,
            description: 'high quality product',
            featured: true
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.5,
            numReviews: 17,
            description: 'high quality product',
            featured: true
        },
        {
            name: 'Nike Slim Pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 70,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
            featured: true
        },
        {
            name: 'Puma Pants',
            category: 'Pants',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Puma',
            rating: 3.0,
            numReviews: 10,
            description: 'high quality product',
            featured: false
        },
        {
            name: 'Adidas Fit Pants',
            category: 'Pants',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 12,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
            featured: false
        }
    ]
};

export default data;