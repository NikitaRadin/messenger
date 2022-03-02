import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import ControlPanel from './ControlPanel';
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
                <ControlPanel setConversation={setConversation} />
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
