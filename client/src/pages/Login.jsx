import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { Modal } from '@mui/material';

const Login = ({open, onClose}) => {
    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0' };


    const textFieldStyle = { marginBottom: '16px' };

    return (
        <Modal open={open} onClose={onClose}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField
                        label='Email'
                        placeholder='Enter Email'
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>
                        Sign in
                    </Button>
                    <Typography>
                        <Link href="#">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography> Do you have an account?
                        <Link href="#">
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Modal>

    );
};

export default Login;
