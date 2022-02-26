import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SearchForm(props) {
    const [searchText, setSearchText] = React.useState('');

    return (
        <Box
            component='form'
            sx={{
                display: 'flex',
                alignItems: 'flex-end'
            }}
        >
            <TextField
                size='small'
                fullWidth
                placeholder='Enter the name of a conversation or a username'
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                sx={{
                    mx: 2,
                    mt: 2
                }}
            />
        </Box>
    );
};

export default SearchForm;
