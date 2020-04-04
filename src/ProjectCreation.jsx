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
            <div className='PC-label-ctn'>
                <Input
                    placeholder = "Type Labels and press 'Enter'"
                    onKeyDown = {this.handleAddLabel} 
                    onChange = {this.handleLabelChange}
                    value = {this.state.value}
                />
                <div className='clear'></div>
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
            <div className='M-view-ctn'>
                <div className='PC-main-title'>Project Creation</div>
                <div className='PC-form-ctn'>
                    <div className='PC-sub-title'>Create a new Project</div>
                    <div className='PC-textfield-ctn'>
                    <TextField 
                    className='PC-title-textfield'
                    label="Title" 
                    variant="outlined"
                    onChange = {this.handleTextChange('projectTitle')} />
                    <TextField
                    className='PC-desc-textfield'
                    label="Description"
                    multiline
                    rows="4"
                    variant="outlined"
                    onChange = {this.handleTextChange('description')} />
                    <TextField 
                    className='PC-rule-textfield'
                    multiline
                    rows="8"
                    label="Rules" 
                    variant="outlined"
                    onChange = {this.handleTextChange('rules')} />
                    {this.displayAnnotationLabels()}
                    {/*
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                        <Button className='PC-upload-btn' variant="contained" color="secondary">Upload</Button>
                    </ReactFileReader>
                    */}
                    <Button className='PC-sumbit-btn' variant="contained" color="primary" onClick={e => this.createProject(this.state.projectTitle)}>Create Project</Button>
                    </div>
                    
                  </div>
                </div>            
        )
        }
};
export { ProjectCreation };