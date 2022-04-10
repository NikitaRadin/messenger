import React from 'react';
import apiClient from '../apiClient';
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

    async function search(event) {
        setSearchText(event.target.value);
        apiClient.get(`search-for-user?search=${event.target.value}`)
            .then(response => {
                setFoundUsers(response.data.map((foundUser) => `${foundUser.first_name} ${foundUser.last_name}`));
            })
            .catch(error => {
                setFoundUsers([]);
            });
    };

    function setConversation(conversation) {
        props.setConversation(conversation);
        setSearchText('');
        setFoundConversations([]);
        setFoundUsers([]);
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
                        setConversation={setConversation}
                    /> :
                    <>
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Conversations" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundConversations}
                            setConversation={setConversation}
                        />
                        <Aligner>
                            <Divider textAlign="left">
                                <Chip label="Users" />
                            </Divider>
                        </Aligner>
                        <ConversationUserList
                            conversationUserList={foundUsers}
                            setConversation={setConversation}
                        />
                    </>
            }
        </>
    );
};

export default ControlPanel;
