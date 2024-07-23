import express from 'express';
import path from 'path';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/order', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import orderRoutes from './routes/orderRoutes';

// const app = express();

// // Set up middleware
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Set up routes
// app.use('/api', orderRoutes);

// // Default route
// app.get('/', (req, res) => {
//     res.redirect('/orders/create');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
