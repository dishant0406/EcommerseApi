const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./Routes/userRoutes');
const authRouter = require('./Routes/authRoute');
const ProductRouter = require('./Routes/ProductRoutes');
const app = express()

app.use(express.json());

// Dot Env + Database
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connection Successfull")
}).catch((err) => {
  console.log(err);
})
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', ProductRouter);


// Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is currently running on port ${PORT}...!`))
