import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Message from './Message';
import SendMessageForm from './SendMessageForm';

const drawerWidth = 25;
const indent = 2;

function Messenger(props) {
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
            <Grid container sx={{ m: 3 }}>
                <Message is_incoming={true} text={'Received message'} />
                <Message is_incoming={true} text={'Received message'} />
                <Message is_incoming={false} text={'Sent message'} />
                <Message is_incoming={true} text={'Received message'} />
                <Message is_incoming={false} text={'Sent message'} />
                <Message is_incoming={false} text={'Sent message'} />
            </Grid>
            <Box sx={{
                position: 'fixed',
                left: `${drawerWidth + indent}%`,
                right: `${indent}%`,
                bottom: `${indent}%`
            }}>
                <SendMessageForm />
            </Box>
        </Box>
    );
};

export default Messenger;
