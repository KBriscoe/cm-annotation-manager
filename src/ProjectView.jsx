import React, { Component } from 'react';

import { userService, authenticationService } from '@/_services';

class ProjectView extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        };   
    }

    render() {
        return(
            <div className='LF-login-ctn'>
                <div>{this.state.currentUser.firstName}</div>
                <div>This is project view!</div>
                </div>            
        )
        }
};

    
export { ProjectView };