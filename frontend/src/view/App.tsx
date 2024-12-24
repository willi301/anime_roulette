import { useState } from 'react'
import { useEffect } from 'react';
import TextField from '@mui/material/TextField/TextField';
import { Autocomplete, Box, Button, Card, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { appModel } from '../type/AppModel';
import { genreOptions } from '../constant/AppConstant';

const App = () => {
  const [ isSubmit, setIsSubmit ] = useState<Boolean>(false);

  //anime object
  const[anime, setAnime] = useState({
      title: "",
      score: "",
      synopsis: "",
      link: ""
  });

  // //get journal entries from database
  // const getAnime = async (e) => {
  //   try {

  //   } catch (error) {

  //   }
  // };

  // useEffect(() => {
    async function getAnime() {
      try {
        const response = await fetch('http://localhost:3000/getRandomAnime', {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const data = await response.json();

        setAnime({
          title: data.animeTitle,
          score: data.score,
          synopsis: data.synopsis,
          link: data.link 
        });

        console.log('Data received:', data);
        return data; // Return data for further processing
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }

    //getAnime();

  // }, []);



  // useEffect(() => {
  //   fetch('http://localhost:3000/getRandomAnime')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))


  //   fetch('http://localhost:3000/getRandomAnime')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  // }, []); 
  // //api call backend
  


  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
} = useForm<appModel>({
    // resolver: yupResolver(ASSIGN_DEALER_SCHEMA_VALIDATOR)
    defaultValues: {
      genres: [],
    },
});

  const onSubmit = (data: appModel) => {
    console.log("Form Data:", data);
    setIsSubmit(true);
    getAnime().then(() => console.log('API call complete'));
  };

  return (
    <div style={{
      background: "linear-gradient(to right,rgb(255, 183, 197),rgb(248, 110, 138))",
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
    }}>
      <Typography variant="h1" color='white'>ANIME ROULETTE</Typography>
      
      <Box
        component="img"
        sx={{
          width: '15%',
          cursor: "pointer"
        }}
        alt="The house from the offer."
        src="src\assets\cat.png"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="genres"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              multiple
              options={genreOptions}
              style={{ width: 300 }}
              getOptionLabel={(option) => option.label}
              value={genreOptions.filter((option) => value.includes(option.value))}
              onChange={(event, newValue) => {
                onChange(newValue.map((item) => item.value));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select some genres"
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    ...params.InputProps,
                    style: { backgroundColor: "white", color: "black" }, // Input field background and text color
                  }}
                />
              )}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Generate
        </Button>
      </form>
      {
        isSubmit ? (
          <Card>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <Typography>Title</Typography>
            <Typography>Genre</Typography>
            <Typography>Description</Typography>
          </Card>
        ) : <></>
      }
    </div>
  )
}

export default App
