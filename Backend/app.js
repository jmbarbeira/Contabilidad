const dotenv = require ('dotenv/types');
dotenv.config({ path: './env/.env' });


const express= require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require ('mongoose');


const appClient = require('./routes/client');
const appInvoice = require('./routes/invoice');
const appUser = require('./routes/user');

const uri = process.env.URI_MONGO;
const opciones={useNewUrlParser: true,useUnifiedTopology:true, useCreateIndex: true,useFindAndModify:false};
mongoose.connect(uri,opciones)
.then(()=>{
    console.log('Respuesta base de datos ok')
})
.catch((err)=>{
    console.log('Error de conexion',err)
})

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

 app.use('/invoice',appInvoice);
 app.use('/client',appClient);
 app.use('/user',appUser);

const port =process.env.PORT;
app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`)
})
