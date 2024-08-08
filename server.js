// const express = require('express')
// const mongoose = require('mongoose')
// const Product = require('./models/product.model');
// const Category = require('./models/catogory.model');
// const app = express()
// app.use(express.json());




const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const Category = require('./models/catogory.model');
const Product = require('./models/product.model');
const parser = require("body-parser");
const app = express();


app.use(express.json());

const api = '/api'; // define the api prefix

// Routes
const categoriesRoute = require('./Routes/categories');
const productRoute = require('./Routes/Products');
const userRoute = require('./Routes/userRouts');
// const authen=require('./midleware/jwt');

app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/user`, userRoute);

app.get('/', (req, res) => {
  res.send({message:"Hello"});
});



// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admIn123568@cluster0.rcmci3p.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
 

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.log("Error connecting to database:", error);
});