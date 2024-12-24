import { Box, Button, CardActions, CardMedia, Rating, Typography } from "@mui/material";
import { AnimeResponse } from "../type/AnimeResponse";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
// import Typography from '@mui/joy/Typography';

interface ResultProps {
    anime: AnimeResponse;
    isSubmit: Boolean;
}

const Result: React.FC<ResultProps> = ({ isSubmit, anime }) => {

    return(
        <>
            {
                isSubmit ? (
                    <>
                        <Divider inset="none" sx={{ borderColor: 'white', color: 'white', my: 3 }}>
                            <Typography variant="h4" sx={{ color: 'white' }}>RESULT</Typography>
                        </Divider>
                        <Card
                            sx={{
                                maxWidth: 500,
                                boxShadow: 3,
                                borderRadius: 2,
                                margin: 'auto', // Center the card
                                background: '#ffffff', // Add background color for clarity
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
                                    <Typography variant="body2" ml={1}>
                                        {anime.score.toFixed(1)} / 10
                                    </Typography>
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    {anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis}
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