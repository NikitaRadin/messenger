import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SearchForm from './SearchForm';
import ConversationUserList from './ConversationUserList';
import Conversation from './Conversation';

const drawerWidth = 25;
const indent = 2;

function Messenger(props) {
    const [conversation, setConversation] = React.useState('');
    const [messages, setMessages] = React.useState([]);

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
            <Drawer
                variant="permanent"
                sx={{
                    width: `${drawerWidth}%`,
                    '& .MuiDrawer-paper': {
                        width: `${drawerWidth}%`
                    }
                }}
            >
                <SearchForm />
                <ConversationUserList
                    conversationUserList={['Name1 Surname1', 'Name2 Surname2', 'Name3 Surname3', 'Name4 Surname4']}
                    setConversation={setConversation}
                />
            </Drawer>
            {
                conversation ?
                    <Conversation
                        left={drawerWidth}
                        conversation={conversation}
                        messages={messages}
                        indent={indent}
                        sendMessage={sendMessage}
                    /> :
                    null
            }
        </Box>
    );
};

export default Messenger;
