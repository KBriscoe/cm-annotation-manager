import React, { Component } from 'react';
import { authenticationService } from '@/_services';

class ProjectView extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            projects: [{title:"test project", date:'today', currentAnnotated:0, totalAnnotated:100}]
        };
    }

    setProjectValues = (id, title, date, currentAnnotated, totalAnnotated) => {
        projects = []
        projects = this.state.projects
        var project = {
            id:id,
            title:title,
            date:date,
            currentAnnotated:currentAnnotated,
            totalAnnotated:totalAnnotated
        };
        projects.push(project)
        this.setState({projects:projects}, () => {})
    }

    displayProjects = () => {
        var currentProjects = []
        currentProjects = this.state.projects
        return(
            <div>
                {currentProjects.map((project) => (
                    <div className='PV-project-item'>
                    <div className='PV-project-title'> {project.title} </div>
                    <div className='PV-project-date'> {project.date} </div>
                    <div className='PV-project-status'> {project.currentAnnotated} of {project.totalAnnotated} items annotated </div>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return(
            <div>
                <div>This is project view!</div>
                {this.displayProjects()}
            </div>            
        )
        }
};

export { ProjectView };