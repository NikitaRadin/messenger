import * as React from 'react';
import apiClient from '../apiClient';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [username, setUsername] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [alertOpen, setAlertOpen] = React.useState(true);
    const [authenticationCode, setAuthenticationCode] = React.useState('');

    const [sendUsernameError, setSendUsernameError] = React.useState('');
    const [sendAuthenticationCodeError, setSendAuthenticationCodeError] = React.useState('');

    const navigate = useNavigate();

    const steps = ['Enter your username', 'Enter your authentication code'];
    const stepHandlers = [sendUsername, sendAuthenticationCode];

    async function sendUsername() {
        apiClient.post('login/', {
            username: username
        })
            .then(response => {
                setUserId(response.data.user_id);
                setActiveStep(activeStep + 1);
            })
            .catch(error => {
                setSendUsernameError(`User ${username} not found`);
                setUsername('');
            });
    };

    function closeAlert() {
        setAlertOpen(false);
    };

    function goBack() { };

    async function sendAuthenticationCode() {
        apiClient.put('login/', {
            user_id: userId,
            code: authenticationCode
        })
            .then(response => {
                props.authenticate(response.data.token);
                setActiveStep(activeStep + 1);
                navigate('/messenger');
            })
            .catch(error => {
                setSendAuthenticationCodeError('Invalid authentication code');
                setAuthenticationCode('');
            });
    };

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
                {activeStep === 0 &&
                    <TextField
                        size='small'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        error={sendUsernameError !== ''}
                        helperText={sendUsernameError}
                        sx={{ my: 5 }}
                    />
                }
                {activeStep === 1 &&
                    <TextField
                        size='small'
                        placeholder='Enter your authentication code'
                        value={authenticationCode}
                        onChange={(event) => setAuthenticationCode(event.target.value)}
                        error={sendAuthenticationCodeError !== ''}
                        helperText={sendAuthenticationCodeError}
                        sx={{ my: 5 }}
                    />
                }
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
                    <Button onClick={stepHandlers[activeStep]}>Send</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
