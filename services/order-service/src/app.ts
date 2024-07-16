import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.json());

// Root route to render the index.pug view
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/orders', async (req, res) => {
    const orders = await prisma.order.findMany({
        include: { items: true },
    });
    res.json(orders);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
