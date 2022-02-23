import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SnackbarContent from '@mui/material/SnackbarContent';

function Message(props) {
    var justifyContent = props.is_incoming ? 'flex-start' : 'flex-end';
    var bgcolor = props.is_incoming ? '#9e9e9e' : '#212121';
    return (
        <Grid item xs={12}>
            <Box sx={{
                display: 'flex',
                justifyContent: justifyContent
            }}>
                <SnackbarContent
                    message={props.text}
                    sx={{
                        bgcolor: bgcolor,
                        m: 0.8
                    }}
                />
            </Box>
        </Grid>
    );
};

export default Message;
