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
            labels: ['one', 'two', 'three'],
            dataUpload:null,
        };   


    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }


    handleLabelDelete = (label) => {
        this.setState({
            labels: this.state.labels.filter(i => i !== label)
          });
    }

    displayAnnotationLabels = () => {
        var currentLabels = []
        currentLabels = this.state.labels
        return(
            <div>
                {currentLabels.map((label) => (
                    <Chip 
                    label={label}
                    onDelete={() => this.handleLabelDelete(label)}
                    >
                    </Chip>
                ))}
            </div>
        )
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
                    {this.displayAnnotationLabels()}
                    <Button variant = "contained" size="medium" >Add +</Button>


                  </div>
                  
                <Button variant="contained" color="primary">Create Project</Button>
                </div>            
        )
        }
        


};

    
export { ProjectCreation };