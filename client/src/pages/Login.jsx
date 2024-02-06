import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox, IconButton, Modal } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations'
import { useState } from 'react';
import Auth from '../utils/auth'

const Login = ({ open, onClose }) => {
    const [formState, setFormState] = useState({ email: '', password: ''})
    const [ login, { error, data }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        try {
            const { data } = await login({
                variables: { ...formState },
            })
            Auth.login(data.login.token)
        } catch (error) {
            console.error(error);
        }
        setFormState({
            email: '',
            password: '',
        });
    };

    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 400,
        margin: "20px auto",
        position: 'relative',
        overflow: 'auto'
    };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0' };
    const textFieldStyle = { marginBottom: '16px' };

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Paper elevation={10} style={paperStyle}>
                    <IconButton
                        onClick={onClose}
                        style={{ position: 'absolute', right: '8px', top: '8px', zIndex: 1, color: 'black' }}
                    >

                        <CloseIcon color="action" className='close' sx={{ color: 'black' }} />
                    </IconButton>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" sx={{ color: 'darkslategray', margin: '8px 0' }}>
                            Sign In
                        </Typography>

                    </Grid>
                    <TextField
                        label='Email'
                        name= 'email'
                        placeholder='Enter Email'
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Password'
                        name='password'
                        placeholder='Enter password'
                        type='password'
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" />}
                        label="Remember me"
                        sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>
                        Sign in
                    </Button>
                    <Typography>
                        <Link href="#" sx={{ color: 'darkslategray' }}>Forgot password?</Link>
                    </Typography>
                    <Typography sx={{ color: 'darkslategray' }}>
                        Do you have an account?
                        <Link component={RouterLink} to="/signup" onClick={onClose} sx={{ color: 'darkslategray' }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
            </form>
        </Modal>
    );
};

export default Login;
