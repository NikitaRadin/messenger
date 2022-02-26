import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function SendMessageForm(props) {
    const [message, setMessage] = React.useState('');

    function sendMessage(event) {
        event.preventDefault();
        if (message) {
            props.sendMessage(message);
            setMessage('');
        };
    };

    return (
        <Box
            component='form'
            onSubmit={sendMessage}
            sx={{
                display: 'flex',
                alignItems: 'flex-end'
            }}
        >
            <TextField
                fullWidth
                multiline
                maxRows={12}
                placeholder='Enter a message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                sx={{ mr: 1 }}
            />
            <Button
                type='submit'
                variant="outlined"
                endIcon={<SendIcon />}
            >
                Send
            </Button>
        </Box>
    );
};

export default SendMessageForm;
