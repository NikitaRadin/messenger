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
    const [conversations, setConversations] = React.useState([]);
    const [conversation, setConversation] = React.useState({
        conversation_id: null,
        name: '',
        user_id: null
    });
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        apiClient.get('conversations/')
            .then(response => {
                setConversations(response.data.map((conversation) => {
                    return {
                        conversation_id: conversation.id,
                        name: conversation.name,
                        user_id: null
                    }
                }));
            })
            .catch(error => { });
    }, []);

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

    function startConversation(conversation) {
        const updatedConversations = [...conversations];
        updatedConversations.unshift(conversation);
        setConversations(updatedConversations);
        changeConversation(conversation);
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
                <ControlPanel
                    conversations={conversations}
                    changeConversation={changeConversation}
                />
            </Drawer>
            <Conversation
                startConversation={startConversation}
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
