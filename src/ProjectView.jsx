import React, { Component } from 'react';
import { authenticationService } from '@/_services';
import { Button, Card, CardContent, Typography } from '@material-ui/core';

class ProjectView extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            projectList:[]
        };

        this._isMounted = false
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        this._isMounted = true
        this.getProjectList()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    async getProjectList(){
        if(this._isMounted){
            console.log("Attempting to get project list...")
            const projectList = await authenticationService.getProjectList(this.state.currentUser)
            this.setState({projectList:JSON.parse(projectList)})
        }
        
    }

    displayProjects = () => {
        var projectList = this.state.projectList;
        return(
            <div>
            {projectList.map((project, i) => (
                <Card
                key={i}
                className='PV-project-ctn'
                >
                <CardContent>
                <Typography>Project ID: {project['ProjectID']}</Typography>
                <Typography>Project Title: {project['Title']}</Typography>
                <Typography>Project Description: {project['Description']}</Typography>
                </CardContent>
                </Card>
            ))}
            </div>
        )
    }

    render() {
        return(
            <div>
            {this.displayProjects()}
            </div>            
        )
        }
};

export { ProjectView };