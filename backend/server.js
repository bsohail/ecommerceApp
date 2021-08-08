import express from 'express';
import data from './data';
import dotenv from 'dotenv'
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = "mongodb+srv://gondal1999:Neon8552@ecommerceapp.qybol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(mongodbUrl, {
    auth: {
      user: "gondal1999",
      password: "Neon8552"
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(()=>console.log("Connected"))
  .catch((error) => console.log("Unsuccessful"));

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
//app.use('/api/products', productRoute);
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if (product)
        res.send(product);
    else
        res.status(404).send({msg: "Product Not Found."});
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});
 
//port number and call back
app.listen(process.env.PORT || 5000, () => { console.log("Server started") });  