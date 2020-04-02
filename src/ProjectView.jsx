import React, { Component } from 'react';
import { userService, authenticationService } from '@/_services';

class ProjectView extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            projects: []
        };      
    }

    setProjectValues = () => {
        var project = {
            id:0,
            title:'',
            date:'',
            currentAnnotated:0,
            totalAnnotated:0
          };

          
    }

    render() {
        return(
            <div>
                <div>{this.state.currentUser.firstName}</div>
                <div>This is project view!</div>
                <div className='VC-Login-viw'>
                <h1>Project Title</h1>
                <p1>0 out of 100 Items annotated</p1>
                <p2>Date Assigned</p2>
                </div>
            </div>            
        )
        }
};

export { ProjectView };