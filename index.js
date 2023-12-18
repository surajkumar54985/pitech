const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.use('/api', userRoutes);


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.URL,connectionParams)
    .then( () => {
        console.log('connected to database successfully');
        app.listen(port, (error) =>{
            if(!error)
                console.log("Server is Successfully Running, and App is listening on port "+ port)
            else 
                console.log("Error occurred, server can't start", error);
            }
        );
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })