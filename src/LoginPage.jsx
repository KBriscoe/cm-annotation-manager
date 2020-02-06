import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Material-UI
import { Input, InputLabel, FormControl, InputAdornment, Button } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';

import { authenticationService } from '@/_services';

import keyImg from './images/key.png'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {username:'', password:''}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    console.log(error)
                }
            );
    }

    handleChange(event) {
        name = event.target.name
        this.setState({[name]:event.target.value});
    }

    render() {
        return (
            <div className='LF-login-ctn'>
            <div className='LF-loginheader-ctn'>
                Internal Annotation Manager
            </div>
            <div className='LF-loginfield-ctn'>
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                <InputLabel htmlFor='Username'>Username</InputLabel>
                <Input
                    name='username'
                    required
                    type='text'
                    placeholder="Account@Email.com"
                    value={this.state.username}
                    onChange={this.handleChange}
                    startAdornment={
                    <InputAdornment position='start'>
                        {/*Username Adornment Icon*/}
                        <AccountCircle />
                    </InputAdornment>
                }></Input>
                </FormControl>
                <br/>
                <FormControl>
                <InputLabel htmlFor='Password'>Password</InputLabel>
                <Input
                    name='password'
                    required
                    type='password'
                    className='LF-input-field'
                    onChange={this.handleChange}
                    startAdornment={
                    <InputAdornment position='start'>
                        {/*Password Adornment Icon*/}
                        <img className='LF-adornment' src={keyImg}/>
                    </InputAdornment>
                }></Input>
                {/*Can Put alert here */}
                </FormControl>
                <br/>
                <Button className='LF-login-btn' variant="contained" color="primary" type='submit' disableElevation>Log in</Button>
            </form>
            </div>
            <div className='LF-register-ctn'>
            {/*<Button className='LF-register-btn' variant="contained" color="primary" disableElevation>Register</Button>*/}
            </div>
        </div>
        )
    }
}

export { LoginPage }; 