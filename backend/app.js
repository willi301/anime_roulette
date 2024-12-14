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

app.get('/getGenreList', async (req, res)=>{
    try {
        const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching genres from Jikan API:", error.message);
        res.status(500).json({ message: "Failed to fetch genres", error: error.message });
    }
        
});



app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);