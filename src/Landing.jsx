import React, { Component } from 'react';

import { userService, authenticationService } from '@/_services';

class Landing extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };   
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        return(
            <div className='LF-login-ctn'>
            <div>{this.state.currentUser.firstName}</div>
            </div>
        )
        }

};
    
export { Landing };