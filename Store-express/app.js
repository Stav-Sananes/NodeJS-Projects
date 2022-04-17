require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//async errors
const ErrorMiddleWare = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

//connectDB
const connectDB = require('./db/connect');
const prodcutsRouter = require('./routes/products');

app.use(express.json());
//rootes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href ="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', prodcutsRouter);
//products route

app.use(notFound);
app.use(ErrorMiddleWare);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connectDb
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
