import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import ControlPanel from './ControlPanel';
import Conversation from './Conversation';
import apiClient from '../apiClient';

const drawerWidth = 25;
const indent = 2;

function Messenger(props) {
    const [conversation, setConversation] = React.useState({
        conversation_id: null,
        name: '',
        user_id: null
    });
    const [messages, setMessages] = React.useState([]);

    function changeConversation(conversation) {
        if (conversation.conversation_id) {
            setConversation(conversation);
        }
        else if (conversation.user_id) {
            apiClient.get(`conversations/${conversation.user_id}`)
                .then(response => {
                    setConversation({
                        conversation_id: response.data.id,
                        name: response.data.name,
                        user_id: null
                    });
                })
                .catch(error => {
                    setConversation(conversation);
                });
        };
    };

    function sendMessage(message) {
        const updatedMessages = [...messages];
        updatedMessages.push({
            is_incoming: false,
            text: message
        });
        setMessages(updatedMessages);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: `${drawerWidth}%`,
                    '& .MuiDrawer-paper': {
                        width: `${drawerWidth}%`
                    }
                }}
            >
                <ControlPanel changeConversation={changeConversation} />
            </Drawer>
            <Conversation
                left={drawerWidth}
                conversation={conversation}
                messages={messages}
                indent={indent}
                sendMessage={sendMessage}
            />
        </Box>
    );
};

export default Messenger;
