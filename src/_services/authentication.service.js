import { BehaviorSubject } from 'rxjs';
import cookie from 'react-cookies'

import config from 'config';
import { handleResponse } from '@/_helpers';
import { authHeader } from '../_helpers/auth-header';

const currentUserSubject = new BehaviorSubject((cookie.load('currentUser')));

export const authenticationService = {
    login,
    createProject,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.dir(user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('currentUser', JSON.stringify(user));
            cookie.save('currentUser', user.token, {path:'/'})
            currentUserSubject.next(user);
            return user;
        });
}

function createProject(title, description, rules, labels) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ title, description, rules, labels })
    };
    return fetch(`${config.apiUrl}/users/createProject`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response)
        })
}

function logout() {
    // remove user from local storage to log user out
    cookie.remove('currentUser', { path: '/' })
    currentUserSubject.next(null);
}
