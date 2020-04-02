import React, { Component } from 'react';
import { authenticationService } from '@/_services';

class Landing extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        };   
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }), err => console.log(err));
    }

    render() {
        return(
            <div className='LF-login-ctn'>
            </div>
        )
        }

};
    
export { Landing };