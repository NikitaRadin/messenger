import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const drawerWidth = '25%';

function PermanentDrawerLeft() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth
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
            <Box sx={{ p: 3 }}>
                <Typography paragraph>abcde</Typography>
            </Box>
        </Box>
    );
};

export default PermanentDrawerLeft;
