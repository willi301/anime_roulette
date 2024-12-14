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


//api to generate random anime an send selected anime detail
app.get('/getRandomAnime', async (req, res)=>{
    //get response from frontend
    const genreid = "1,2,3";
    let total, randomNumber;

    //total count api
    try {
        //get total amount anime in specified genre
        //p.s for template literal ada bedanya antara ' and `
        const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreid}`);
        
        //get total number
        total = response.data.pagination.items.total
        
        //generate random number between 1 and total amount
        randomNumber = Math.floor(Math.random() * total) + 1;

        //return filtered response
        //res.json(randomNumber);
    }
    catch (error) {
        console.error("Error fetching anime total from Jikan API:", error.message);
        res.status(500).json({ message: "Failed to fetch anime total", error: error.message });
    }



    //get anime detail
    try {
        //get anime detail based on the mal_id
        const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreid}&limit=1&page=${randomNumber}`);

        // const englishTitle = response.data.title

        // const animeDetail = {
        //     imageLink: response.data.images.image_url,
        //     animeTitle; response.data
        // }
        

        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching anime detail from Jikan API:", error.message);
        res.status(500).json({ message: "Failed to fetch anime detail", error: error.message });
    }

        
});





app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);