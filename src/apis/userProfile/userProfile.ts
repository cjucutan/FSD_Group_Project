import type { User } from "../../components/common/types/users";
import { userData } from "../../components/data/user_data";

export function getUsers(){
    return userData;
}

export function getUserById(userId: string): User{
    const foundUser = userData.find((u) => u.id === userId)

    if(!foundUser) {
        throw new Error(`Failed to find user with id: ${userId}`)
    }

    return foundUser;
}

export function createUser(user: User){
    userData.push(user);
    return user;
}

export function updateUser(user: User){
    const foundUserIndex = userData.findIndex((u) => u.id === user.id);

    if (foundUserIndex === -1) {
        throw new Error(`Failed to update user with id: ${user.id}`);
    }

    userData[foundUserIndex] = user;
    return userData[foundUserIndex];
}

export function deleteUser(user: User){
    const foundUser = userData.findIndex((u) => u.id === user.id);

    if (foundUser === -1){
        throw new Error(`Failed to delete user with id: ${user.id}`);
    }

    const deletedUser = userData.splice(foundUser, 1);
    return deletedUser;
}