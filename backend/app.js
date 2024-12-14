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

//api to send list of genres
app.get('/getGenreList', async (req, res)=>{
    try {
        //api from jikan to get genre list
        const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
        const genres = response.data.data;
        //filter adult contents
        const filteredId = [9, 49, 12];
        const filteredResponse = genres.filter(genre => !filteredId.includes(genre.mal_id))

        //return filtered response
        res.json(filteredResponse);
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