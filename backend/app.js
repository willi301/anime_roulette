const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const PORT = 3000;

let corsOptions = {
    origin : ['http://localhost:5173'],
 }
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors(corsOptions));

//example on how to receive request and use the request
app.use(express.json());
app.get('/', (req, res)=>{
    const {name} = req.body;
    
    res.send(`Welcome ${name}`);
})

app.get('/test', (req, res)=>{
    res.json({message: "this connects"});
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
app.post('/getRandomAnime', async (req, res)=>{
    //get response from frontend
    console.log(req.body);
    const genreidList  = req.body;

    const stringResult = genreidList.join(',');
    console.log("string version", stringResult);
    const genreid = stringResult;
    let total, randomNumber;
    console.log('Request received at /getRandomAnime');
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

    //console.log(response);

    //get anime detail
    try {
        //get anime detail based on the mal_id
        const response2 = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreid}&limit=1&page=${randomNumber}`);

        const genres = response2.data.data[0].genres;
        const genresId = genres.map(id => id.mal_id);
        console.log(genresId);

        //put relevant detail to an object
        const animeDetail = {
            //since response is an array data needs to pick the 0 index
            imageLink: response2.data.data[0].images.jpg.image_url,
            animeTitle: response2.data.data[0].title,
            score: response2.data.data[0].score,
            synopsis: response2.data.data[0].synopsis,
            link: response2.data.data[0].url,
            genreList: genresId
        };
        

        res.json(animeDetail);
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