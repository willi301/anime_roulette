import { Autocomplete, Box, Button, CircularProgress, Typography } from '@mui/material';
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
        genreList: [],
    };
    const { 
        anime,
        fetchAnime,
        isLoading
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
            alt="cat logo"
            src="/assets/cat.png"
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
                        '& .MuiChip-root': { 
                            backgroundColor: '#f0f0f0', // Background color of the tag
                            color: '#333', // Text color of the tag
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'white', color: 'black' }}>
                    Generate
                </Button>
            </Box>
        </form>

        {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                    <CircularProgress sx={{ color: 'white' }} />
                </Box>
            ) : (
                <Result isSubmit={isSubmit} anime={anime != undefined ? anime : defaultObject} />
        )}
        </div>
    )
}

export default App;
