const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mongoURL =
  process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(cookieParser())


//routes
const tasksRoute = require('./routes/tasksRoute');
const authRoute = require('./routes/authRoute');

app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const port = process.env.PORT;
mongoose
    .connect(mongoURL)
    .then(
        app.listen(port, () => {
            console.log("Server Running");
        })
    )
    .catch((err) => {
        console.log(err);
    });
