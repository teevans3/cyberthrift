const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images') 
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname );
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

const storeRoutes = require('./routes/store');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Content-Type, Authorization');
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(transactionRoutes);
app.use('/auth', authRoutes);
app.use('/store', storeRoutes);
app.use('/user', userRoutes);

// "catch all" error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

app.listen(8080);
