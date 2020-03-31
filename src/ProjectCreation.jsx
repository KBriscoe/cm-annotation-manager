import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Chip } from '@material-ui/core';

import { userService, authenticationService } from '@/_services';

class ProjectCreation extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            projectTitle: null,
            description: null,
            rules: null,
            labels: [],
            dataUpload:null,
        
        };   


    }
    onChange = labels => {
        this.setState({ labels});
    }


    

    render() {
        return(
            <div className='LF-login-ctn'>
                <div>{this.state.currentUser.firstName}</div>
                <div>This is project creation</div>
                <div className = 'project-creation-form'>
                    <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined"
                    onChange = {(event, newValue) => this.setState({projectTitle:newValue})} />
                    <TextField
                    id="filled-multiline-flexible"
                    label="description"
                    multiline
                    rowsMax="4"
                    variant="outlined"
                    onChange = {(event, newValue) => this.setState({description:newValue})} />
                    <TextField 
                    id="outlined-basic" 
                    label="rules" 
                    variant="outlined"
                    onChange = {(event, newValue) => this.setState({rules:newValue})} />
                    <TextField 
                    id="outlined-basic" 
                    label="labels" 
                    variant="outlined"
                    onChange = {(event, newValue) => this.setState({labels:newValue})} />

                  </div>
                  
                <Button variant="contained" color="primary">Create Project</Button>
            </div>            
        )
        }
        


};

    
export { ProjectCreation };