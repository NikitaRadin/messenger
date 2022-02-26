import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Message from './Message';
import SendMessageForm from './SendMessageForm';

function Conversation(props) {
    return (
        <>
            <AppBar sx={{
                position: 'fixed',
                left: `${props.left}%`
            }}>
                <Toolbar>
                    <Typography variant="h6">{props.conversation}</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{
                flexGrow: 1,
                mx: 3,
                my: 2
            }}>
                <Toolbar />
                {props.messages.map(
                    (message) => <Message is_incoming={message.is_incoming} text={message.text} />
                )}
            </Box>
            <Box sx={{
                position: 'fixed',
                left: `${props.left + props.indent}%`,
                right: `${props.indent}%`,
                bottom: `${props.indent}%`
            }}>
                <SendMessageForm sendMessage={props.sendMessage} />
            </Box>
        </>
    );
};

export default Conversation;
