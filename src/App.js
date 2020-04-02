import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { Landing } from './Landing.jsx';
import { LoginPage } from './LoginPage.jsx';
import { ProjectCreation } from './ProjectCreation.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/projectcreation" className="nav-item nav-link">Project Creation</Link>
                                <Link to="/projectview" className="nav-item nav-link">Project View</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <PrivateRoute exact path="/" component={Landing} />
                    <PrivateRoute path="/projectcreation" component={ProjectCreation} />
                    <PrivateRoute path="/projectview" component={ProjectView} />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        );
    }
}

export { App }; 