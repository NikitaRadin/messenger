import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ConversationUserList from './ConversationUserList';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function ControlPanel(props) {
    const [searchText, setSearchText] = React.useState('');
    const [foundConversations, setFoundConversations] = React.useState([]);
    const [foundUsers, setFoundUsers] = React.useState([]);

    function search(event) {
        setSearchText(event.target.value);
        if (event.target.value === 'ab') {
            setFoundConversations(['Conversation1 Conversation1', 'Conversation2 Conversation2']);
            setFoundUsers(['User1 User1', 'User2 User2', 'User3 User3']);
        }
        else if (event.target.value === 'abcd') {
            setFoundConversations(['Conversation3 Conversation3', 'Conversation4 Conversation4', 'Conversation5 Conversation5']);
            setFoundUsers(['User4 User4', 'User5 User5']);
        }
        else {
            setFoundConversations([]);
            setFoundUsers([]);
        };
    };

    const Aligner = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
            marginTop: theme.spacing(2)
        }
    }));

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    mb: 2
                }}
            >
                <TextField
                    size='small'
                    fullWidth
                    placeholder='Enter the name of a conversation or a username'
                    value={searchText}
                    onChange={search}
                    sx={{
                        mx: 2,
                        mt: 2
                    }}
                />
            </Box>
            {
                !searchText ?
                    <ConversationUserList
                        conversationUserList={['Name1 Surname1', 'Name2 Surname2', 'Name3 Surname3', 'Name4 Surname4']}
                        setConversation={props.setConversation}
                    /> :
                    <>
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Conversations" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundConversations}
                            setConversation={props.setConversation}
                        />
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Users" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundUsers}
                            setConversation={props.setConversation}
                        />
                    </>
            }
        </>
    );
};

export default ControlPanel;
