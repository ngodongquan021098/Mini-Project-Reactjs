const express = require("express");
const mongoose = require("mongoose");
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cors = require("cors")
require('dotenv').config()

const connectDb = async () => {
  try {
    const result = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learning.kaynawg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
};

connectDb()

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server start on ${PORT}`));
