import { BehaviorSubject } from 'rxjs';
import cookie from 'react-cookies'

import config from 'config';
import { handleResponse } from '@/_helpers';
import { authHeader } from '../_helpers/auth-header';
import { responsiveFontSizes } from '@material-ui/core';

const currentUserSubject = new BehaviorSubject((cookie.load('currentUser')));

export const authenticationService = {
    login,
    createProject,
    logout,
    getUserList,
    getProjectList,
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

async function createProject(title, description, rules, labels, users) {
    var header = authHeader()
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ title, description, rules, labels, users })
    };
    const response = await fetch(`${config.apiUrl}/users/createProject`, requestOptions)
    const json = await response.json()
    return json
}

async function getUserList(userGroup) {
    var header = authHeader()
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({userGroup})
    };
    const response = await fetch(`${config.apiUrl}/users/getUserList`, requestOptions)
    const userList = await response.json();
    return userList
}

async function getProjectList(userToken) {
    var header = authHeader()
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({userToken})
    };
    const response = await fetch(`${config.apiUrl}/users/getProjectList`, requestOptions)
    const projectList = await response.json();
    return projectList
}

function logout() {
    // remove user from cookies to log user out
    cookie.remove('currentUser', { path: '/' })
    currentUserSubject.next(null);
}
