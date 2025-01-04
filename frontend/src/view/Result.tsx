import { Box, Button, CardActions, CardMedia, Chip, Rating, Typography } from "@mui/material";
import { AnimeResponse } from "../type/AnimeResponse";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
// import Typography from '@mui/joy/Typography';
import React, { useEffect, useMemo } from 'react';
import { genreOptions } from "../constant/AppConstant";

interface ResultProps {
    anime: AnimeResponse;
    isSubmit: Boolean;
}

const Result: React.FC<ResultProps> = ({ isSubmit, anime }) => {

    const genreList = useMemo(() => {
        console.log('anime', anime);
        if (!anime) return [];
        return anime.genreList.map((id) => {
            const genre = genreOptions.find((item) => item.id == id);
            return genre ? genre.genre : null;
        }).filter((genre) => genre != null);
    }, [anime]);
    

    return(
        <>
            {
                isSubmit ? (
                    <>
                        <Divider inset="none" sx={{ borderColor: 'white', color: 'white', my: 3 }}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    color: 'white',
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                    textAlign: 'center',
                                }}
                            >
                                RESULT
                            </Typography>
                        </Divider>
                        <Card
                            sx={{
                                maxWidth: 500,
                                // boxShadow: 3,
                                borderRadius: 2,
                                margin: 'auto',
                                background: '#ffffff',
                                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                                transform: 'translateY(0)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-10px)',
                                    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.3)',
                                },
                            }}
                        >
                            <CardOverflow>
                                <AspectRatio ratio="1">
                                    <img
                                        src={anime.imageLink}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>

                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {anime?.animeTitle}
                                </Typography>

                                <Box display="flex" alignItems="center" mb={1}>
                                    <Rating value={anime.score / 2} precision={0.5} readOnly />
                                    { anime.score ? 
                                        <Typography variant="body2" ml={1}>
                                            {anime.score.toFixed(1)} / 10
                                        </Typography> 
                                        : 
                                        <Typography variant="body2" ml={1}>
                                            No Rating
                                        </Typography> 
                                    }
                                    
                                </Box>

                                <Box display="flex" alignItems="center" mb={1} flexWrap="wrap" gap={1}>
                                    { genreList.length > 0 ? (
                                        genreList.map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item}
                                                color="primary"
                                                sx={{
                                                    backgroundColor: '#ff8888',
                                                    color: '#fff',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    {/* {anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis} */}
                                    {anime.synopsis}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                href={anime.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ backgroundColor: '#ff8888', color: "white" }}
                                >
                                Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </>
                ) : <></>
            }
        </>
    );
};

export default Result;