const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend origin
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allows cookies to be sent across domains if needed
}));

app.use(express.json());
app.use(cookieParser());

const routers = require('./routes/todoRoutes')
app.use('/api/v1', routers);
app.get('/', (req, res) => {
    res.send("Welcome to TODO App");
})

//  DB Connection
const dbConnect = require('./config/database')
dbConnect();

// Server start on port
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})