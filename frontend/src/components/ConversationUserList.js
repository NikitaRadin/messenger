import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

function ConversationUserList(props) {
    return (
        <List>
            {props.conversationUserList.map((conversation, index) => (
                <ListItem button onClick={(event) => props.setConversation(conversation.name)} key={conversation.id}>
                    <ListItemAvatar>
                        <Avatar>NS</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={conversation.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default ConversationUserList;
