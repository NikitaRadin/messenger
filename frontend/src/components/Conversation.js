import apiClient from '../apiClient';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Message from './Message';
import SendMessageForm from './SendMessageForm';
import Button from '@mui/material/Button';

function Conversation(props) {
    if (!props.conversation.conversation_id && !props.conversation.user_id) {
        return <></>
    };

    async function startConversation() {
        apiClient.post('conversations/', {
            users: [props.conversation.user_id]
        })
            .then(response => {
                props.startConversation({
                    conversation_id: response.data.id,
                    name: response.data.name,
                    user_id: null
                });
            })
            .catch(error => { });
    };

    return (
        <>
            <AppBar sx={{
                position: 'fixed',
                left: `${props.left}%`
            }}>
                <Toolbar>
                    <Typography variant="h6">{props.conversation.name}</Typography>
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
                bottom: `${props.indent}%`,
                display: `${props.conversation.conversation_id ? '' : 'flex'}`,
                justifyContent: `${props.conversation.conversation_id ? '' : 'center'}`
            }}>
                {
                    props.conversation.conversation_id ?
                        <SendMessageForm sendMessage={props.sendMessage} /> :
                        <Button onClick={startConversation}>Start conversation</Button>
                }
            </Box>
        </>
    );
};

export default Conversation;
