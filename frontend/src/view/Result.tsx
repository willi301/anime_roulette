import { Box, Card, Divider, Typography } from "@mui/material";
import { AnimeResponse } from "../type/AnimeResponse";

interface ResultProps {
    anime: AnimeResponse | undefined;
    isSubmit: Boolean;
}

const Result: React.FC<ResultProps> = ({ isSubmit, anime }) => {

    return(
        <>
            {
                isSubmit ? (
                    <>
                        <Divider sx={{ height: 2, backgroundColor: 'white', my: 5 }}>
                            <Typography variant="h4" color='white'>RESULT</Typography>
                        </Divider>
                        <Card>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                src={anime?.imageLink}
                            />
                            <Typography>Title: {anime?.animeTitle}</Typography>
                            <Typography>Score: {anime?.score}</Typography>
                            <Typography>Link: {anime?.link}</Typography>
                            <Typography>Synopsis: {anime?.synopsis}</Typography>
                        </Card>
                    </>
                ) : <></>
            }
        </>
    );
};

export default Result;