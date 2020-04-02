import React, { Component } from 'react';
import { userService, authenticationService } from '@/_services';

class ProjectView extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        };   
    }

    setProjectValues = () => {
        var project = {
            id:-1,
            title:'',
            date:'',
            currentAnnotated:-1,
            totalAnnotated:-1
          };
    }

    render() {
        return(
            <div>
                <div>{this.state.currentUser.firstName}</div>
                <div>This is project view!</div>
                <div>Project Title</div>
                <div>Items annotated</div>
            </div>            
        )
        }
};

    
export { ProjectView };