import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

function ConversationUserList(props) {
    return (
        <List>
            {props.conversationUserList.map((conversation, index) => (
                <ListItem button onClick={(event) => props.changeConversation(conversation)}
                    key={conversation.conversation_id || conversation.user_id}>
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
