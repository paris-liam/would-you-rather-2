export const PULL_USERS = 'PULL_USERS';

export function pullUsers (users) {
    return {
        type: PULL_USERS,
        users
    }
}