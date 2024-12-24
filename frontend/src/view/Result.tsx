import { Box, Card, Divider, Typography } from "@mui/material";

interface ResultProps {
    isSubmit: Boolean;
}

const Result: React.FC<ResultProps> = ({ isSubmit }) => {

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
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            />
                            <Typography>Title</Typography>
                            <Typography>Genre</Typography>
                            <Typography>Description</Typography>
                        </Card>
                    </>
                ) : <></>
            }
        </>
    );
};

export default Result;