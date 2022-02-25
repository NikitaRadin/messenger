import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Message from './Message';
import SendMessageForm from './SendMessageForm';

const drawerWidth = 25;
const indent = 2;

function Messenger(props) {
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
                        <ListItem button key={conversation}>
                            <ListItemAvatar>
                                <Avatar>NS</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={conversation} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <AppBar sx={{
                position: 'fixed',
                left: `${drawerWidth}%`
            }}>
                <Toolbar>
                    <Typography variant="h6">abcde</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{
                flexGrow: 1,
                mx: 3,
                my: 2
            }}>
                <Toolbar />
                {messages.map(
                    (message) => <Message is_incoming={message.is_incoming} text={message.text} />
                )}
            </Box>
            <Box sx={{
                position: 'fixed',
                left: `${drawerWidth + indent}%`,
                right: `${indent}%`,
                bottom: `${indent}%`
            }}>
                <SendMessageForm sendMessage={sendMessage} />
            </Box>
        </Box>
    );
};

export default Messenger;
