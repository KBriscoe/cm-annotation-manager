import React, { Component } from 'react';
import { Button, TextField, Chip, Input } from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import { authenticationService} from '@/_services';

class ProjectCreation extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            projectTitle: null,
            description: null,
            rules: null,
            key: null,
            value: "",
            labels: ['one', 'two', '111'],
            dataUpload:null,
        };   
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    handleTextChange = name => event => {
        this.setState({[name]:event.target.value}, () => {})
    }

    handleLabelChange = evt => {
        this.setState({
          value: evt.target.value,
        });
    };

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
                {currentLabels.map((label, i) => (
                    <Chip 
                    key={i}
                    label={label}
                    onDelete={() => this.handleLabelDelete(label)}
                    >
                    </Chip>
                ))}
            </div>
        )
    }

    createProject = () => {
        //Create the base project first
        authenticationService.createProject(this.state.projectTitle, this.state.description, this.state.rules, this.state.labels)
    }

    handleAddLabel = evt => {

        var currentLabels = []
        currentLabels = this.state.labels

        if (["Enter", "Tab", ","].includes(evt.key)){
            evt.preventDefault();

            var value = this.state.value.trim();
            currentLabels.push(value)
            console.log(value)
            this.setState({
                labels: currentLabels,
                value: ""
            });
        }
    }
    
    render() {
        return(
            <div>
                <div>{this.state.currentUser.firstName}</div>
                <div>This is project creation</div>
                <div className = 'project-creation-form'>
                    <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined"
                    onChange = {this.handleTextChange('projectTitle')} />
                    <TextField
                    id="filled-multiline-flexible"
                    label="description"
                    multiline
                    rowsMax="4"
                    variant="outlined"
                    onChange = {this.handleTextChange('description')} />
                    <TextField 
                    id="outlined-basic" 
                    label="rules" 
                    variant="outlined"
                    onChange = {this.handleTextChange('rules')} />
                    {this.displayAnnotationLabels()}
                    <Input
                    placeholder = "Type Labels and press 'Enter'"
                    onKeyDown = {this.handleAddLabel} 
                    onChange = {this.handleLabelChange}
                    value = {this.state.value}
                    />
                    {/*
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>
                    */}
                  </div>
                  
                <Button variant="contained" color="primary" onClick={e => this.createProject(this.state.projectTitle)}>Create Project</Button>
                </div>            
        )
        }
};
export { ProjectCreation };