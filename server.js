const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(() => console.log('MongoDB connected successfully ✅'))
   .catch(err => console.log(err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
});