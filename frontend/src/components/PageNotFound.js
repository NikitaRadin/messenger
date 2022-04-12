import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function PageNotFound(props) {
    return (
        <Box sx={{ mt: 40 }}>
            <Container maxWidth="md">
                <Alert severity="error">
                    <AlertTitle>Page not found</AlertTitle>
                    The page you requested was not found
                </Alert>
            </Container>
        </Box>
    );
};

export default PageNotFound;
