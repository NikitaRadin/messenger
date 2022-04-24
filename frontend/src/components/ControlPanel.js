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
                        conversationUserList={[
                            { conversation_id: 1, name: 'Name1 Surname1', user_id: null },
                            { conversation_id: 2, name: 'Name2 Surname2', user_id: null },
                            { conversation_id: 3, name: 'Name3 Surname3', user_id: null },
                            { conversation_id: null, name: 'Name4 Surname4', user_id: 2 },
                            { conversation_id: null, name: 'Name5 Surname5', user_id: 4 }
                        ]}
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
