import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser) {
        return { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser}` };
    } else {
        return {};
    }
}