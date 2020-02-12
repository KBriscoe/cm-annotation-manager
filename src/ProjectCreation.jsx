import React, { Component } from 'react';

import { userService, authenticationService } from '@/_services';

class ProjectCreation extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };   
    }

    render() {
        return(
            <div className='LF-login-ctn'>
            <div>{this.state.currentUser.firstName}</div>
            <div>This is project creation</div>
            </div>
        )
        }

};
    
export { ProjectCreation };