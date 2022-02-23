import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function SendMessageForm(props) {
    return (
        <Box
            component='form'
            sx={{
                display: 'flex',
                alignItems: 'flex-end'
            }}
        >
            <TextField
                fullWidth
                multiline
                maxRows={12}
                label="Enter a message"
                sx={{ mr: 1 }}
            />
            <Button
                variant="outlined"
                endIcon={<SendIcon />}
            >
                Send
            </Button>
        </Box>
    );
};

export default SendMessageForm;
