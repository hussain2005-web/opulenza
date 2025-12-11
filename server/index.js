const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
// Routes
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const tableRoutes = require('./routes/tableRoutes');
// const roomRoutes = require('./routes/roomRoutes');
// const billRoutes = require('./routes/billRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/tables', tableRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/bills', billRoutes);

app.get('/', (req, res) => {
    res.send('Hotel Management System API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
