import { useState } from 'react'
import { useEffect } from 'react';
import TextField from '@mui/material/TextField/TextField';
import { Autocomplete, Box, Button, Card, Chip, Divider, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { AppModel } from '../type/AppModel';
import { genreOptions } from '../constant/AppConstant';
import Result from './Result';

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
} = useForm<AppModel>({
    defaultValues: {
    genres: [],
    },
});

const onSubmit = (data: AppModel) => {
    console.log("Form Data:", data);
    setIsSubmit(true);
    getAnime().then(() => console.log('API call complete'));
  };

return (
    <div style={{
    background: "linear-gradient(to right,rgb(255, 183, 197),rgb(248, 110, 138))",
    display: 'flex',
    width: '100vw',
    height: '100vh',
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
            multiple
            disableCloseOnSelect
            disablePortal
            options={genreOptions}
            style={{ width: 300 }}
            getOptionLabel={(option) => option.genre}
            value={genreOptions.filter((option) => value.includes(option.id.toString()))}
            onChange={(event, newValue) => {
                onChange(newValue.map((item) => item.id.toString()));
            }}
            sx={{
                mb: 5,
                '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator': {
                color: '#FFFFFF', // Dropdown arrow and clear icon
                },
                '& .MuiAutocomplete-listbox': {
                backgroundColor: '#21130d', // Dropdown background
                color: '#FFFFFF', // Dropdown text
                },
                '& .MuiAutocomplete-option': {
                backgroundColor: 'red', // Option background (light pink)
                color: '#FFFFFF', // Option text color
                '&:hover': {
                    backgroundColor: '#E38CA3', // Highlight hovered option (darker pink)
                },
                },
                '& .MuiAutocomplete-noOptions': { // No Options
                backgroundColor: '#F8BFD0',
                color: '#FFFFFF',
                },
            }}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Select some genres"
                variant="standard"
                sx={{
                    // backgroundColor: '#F8BFD0',
                    '& .MuiInputBase-root, & .MuiFormLabel-root': {
                    color: '#FFFFFF', // Input Text & Label
                    },
                    // '& .MuiFormLabel-root': {
                    //   color: '#FFFFFF', // Label
                    // },
                    '& .MuiInput-underline:before': {
                    borderBottomColor: 'transparent', // Underline before focus
                    },
                    '& .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#FFFFFF', // Underline on focus and hover
                    },
                    // '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    //   borderBottomColor: '#FFFFFF', // Underline on hover
                    // },
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

    <Result isSubmit={isSubmit} />
    </div>
)
}

export default App
