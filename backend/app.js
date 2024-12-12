const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

//example on how to receive request and use the request
app.use(express.json());
app.post('/', (req, res)=>{
    const {name} = req.body;
    
    res.send(`Welcome ${name}`);
})

app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.get('/getAnimeList', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);