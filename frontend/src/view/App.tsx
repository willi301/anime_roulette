import { useState } from 'react'
import { useEffect } from 'react';
import TextField from '@mui/material/TextField/TextField';
import { Autocomplete, Box, Button, Card, Chip, Divider, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { AppModel } from '../type/AppModel';
import { genreOptions } from '../constant/AppConstant';
import Result from './Result';
import useAppHandler from '../handler/useAppHandler';

const App = () => {
    const [ isSubmit, setIsSubmit ] = useState<Boolean>(false);
    const { 
        anime,
        fetchAnime 
    } = useAppHandler();

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
        fetchAnime();
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

        <Result isSubmit={isSubmit} anime={anime} />
        </div>
    )
}

export default App;
