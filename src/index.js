require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const todoRoutes = require('./routes/todos');
const cors = require('cors');

app.use(cors());




mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB', err));

app.use(express.json());

app.use('/api', todoRoutes);


//logger
app.use((req,res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});




app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});