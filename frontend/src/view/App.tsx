import { Autocomplete, Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { genreOptions } from '../constant/AppConstant';
import useAppHandler from '../handler/useAppHandler';
import { AppModel } from '../type/AppModel';
import Result from './Result';
import { AnimeResponse } from '../type/AnimeResponse';
import React from 'react';




const App = () => {
    const [ isSubmit, setIsSubmit ] = useState<Boolean>(false);
    const defaultObject: AnimeResponse = {
        imageLink: '',
        animeTitle: '',
        score: 0,
        synopsis: '',
        link: '',
    };
    const { 
        anime,
        fetchAnime 
    } = useAppHandler();

    const {
        control,
        handleSubmit,
        formState: {},
    } = useForm<AppModel>({
        defaultValues: {
        genres: [],
        },
    });

    const onSubmit = (data: AppModel) => {
        console.log("Form Data:", data);
        setIsSubmit(true);
        fetchAnime(data.genres);
    };

    return (
        <div style={{
            background: "linear-gradient(to right,rgb(255, 183, 197),rgb(248, 110, 138))",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            minHeight: '100vh',
            overflowY: 'auto',
        }}>
        <Typography variant="h1" color='white'>ANIME ROULETTE</Typography>
        
        <Box
            component="img"
            sx={{
            width: '15%',
            cursor: "pointer"
            }}
            alt="cat logo."
            src="src\assets\cat.png"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
            name="genres"
            control={control}
            render={({ field: { onChange, value }, fieldState: {} }) => (
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
                        '& .MuiInputBase-root, & .MuiFormLabel-root': {
                            color: '#FFFFFF',
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'transparent',
                        },
                        '& .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: '#FFFFFF',
                        },
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

        <Result isSubmit={isSubmit} anime={anime != undefined ? anime : defaultObject}/>
        </div>
    )
}

export default App;
