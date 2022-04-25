import React from 'react';
import apiClient from '../apiClient';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ConversationUserList from './ConversationUserList';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function ControlPanel(props) {
    const [conversations, setConversations] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [foundConversations, setFoundConversations] = React.useState([]);
    const [foundUsers, setFoundUsers] = React.useState([]);

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

    async function search(event) {
        setSearchText(event.target.value);
        apiClient.get(`search-for-user?search=${event.target.value}`)
            .then(response => {
                setFoundUsers(response.data.map((foundUser) => {
                    return {
                        conversation_id: null,
                        name: `${foundUser.first_name} ${foundUser.last_name}`,
                        user_id: foundUser.id
                    }
                }));
            })
            .catch(error => {
                setFoundUsers([]);
            });
    };

    function changeConversation(conversation) {
        setSearchText('');
        setFoundConversations([]);
        setFoundUsers([]);
        props.changeConversation(conversation);
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
                        conversationUserList={conversations}
                        changeConversation={props.changeConversation}
                    /> :
                    <>
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Conversations" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundConversations}
                            changeConversation={changeConversation}
                        />
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Users" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundUsers}
                            changeConversation={changeConversation}
                        />
                    </>
            }
        </>
    );
};

export default ControlPanel;
