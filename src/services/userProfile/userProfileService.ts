import * as UserRepo from "../../apis/userProfile/userProfile";
import type { User } from "../../../src/components/common/types/users";

export async function getUsers(){
    const users = await UserRepo.getUsers();
    return users;
}

export async function createNewUser(user: User){
    return await UserRepo.createUser(user);
}

export async function getUserbyId(id: string){
    return await UserRepo.getUserById(id);
}

export async function updateUser(user: User, sessionToken: string){
    return await UserRepo.updateUser(user, sessionToken);
}

export async function deleteUser(id: string, sessionToken: string){
    return await UserRepo.deleteUser(id, sessionToken);
}

export async function validateUser(user: Partial<User>){
    const validationErrors = new Map<string, string>();

    if(!user.username?.trim()){
        validationErrors.set("username", "Username is required");
    }

    return validationErrors;
}