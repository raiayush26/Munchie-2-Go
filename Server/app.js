require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const foodroute = require('./Route/food')
const Cartroute = require('./Route/Cart')
const Adminroute = require('./Route/User')

const Orderroute = require('./Route/Order')
const QRrouter = require('./Route/QR')
const bodyParser=require('body-parser')


const cors = require('cors');

const app = express();
app.use(cors({origin:'*'}));
mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin: '*'}))
const dbo = require("./db/conn");

// Adding the Models
const  item = require("./Models/Resturant");

// Route
app.use('/', foodroute);
app.use('/cart',Cartroute)
app.use('/order',Orderroute)
app.use('/QR',QRrouter)
app.use('/admin',Adminroute)

mongoose.connect(process.env.DB, (err) => {

    if (!err) {
        console.log("Connected to MongoDB in app js.");
    }
    
});
Port = 2610;
app.listen(Port, function(){
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
     
      });

    console.log("Server is running on port  "+Port);
});