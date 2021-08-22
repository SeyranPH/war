import express from "express";
import bodyParser from "body-parser";
import {config} from "./config"
import mongoose from "mongoose";
import router from './api/index'
import {ErrorHandler} from './api/middlewares/ErrorHandler'

mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the MongoDB')
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler);


const port = process.env.PORT;
app.listen( port, () => {
    console.log('server started');
} );

