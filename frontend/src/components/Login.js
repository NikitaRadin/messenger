import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const steps = ['Enter your username', 'Enter your authentication code'];

function Login() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [username, setUsername] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [alertOpen, setAlertOpen] = React.useState(true);

    async function sendUsername() {
        await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username })
        })
            .then(response => response.json())
            .then(
                (response) => {
                    setUserId(response.user_id);
                    setActiveStep(activeStep + 1);
                },
                (error) => { }
        );
    };

    function closeAlert() {
        setAlertOpen(false);
    };

    function goBack() { };

    function sendAuthenticationCode() { };

    return (
        <Box sx={{ mt: 30 }}>
            <Container maxWidth="md">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Container>
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <TextField
                    size='small'
                    placeholder='Enter your username'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    sx={{ my: 5 }}
                />
            </Container>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={goBack}
                        sx={{ mr: 1 }}
                    >
                        Go back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={sendUsername}>Send</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
