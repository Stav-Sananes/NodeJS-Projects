require('./db/connect');

const express = require('express');

const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(notFound);

app.use(errorHandlerMiddleware);
//routes

app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});
app.use('/api/v1/tasks', tasks);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
