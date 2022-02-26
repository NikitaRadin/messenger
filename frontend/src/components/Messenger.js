import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
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
                <List>
                    {['Name1 Surname1', 'Name2 Surname2', 'Name3 Surname3', 'Name4 Surname4'].map((conversation, index) => (
                        <ListItem button onClick={(event) => setConversation(conversation)} key={conversation}>
                            <ListItemAvatar>
                                <Avatar>NS</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={conversation} />
                        </ListItem>
                    ))}
                </List>
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
