import * as UserRepo from "../../apis/userProfile/userProfile";
import type { User } from "../../../src/components/common/types/users";

export async function getUsers(){
    const users = await UserRepo.getUsers();
    return users;
}

export async function createNewUser(user: User){
    return await UserRepo.createUser(user);
}

export async function updateUser(user: User){
    return await UserRepo.updateUser(user);
}

export async function deleteUser(user: User){
    return await UserRepo.deleteUser(user);
}

export async function validateUser(user: Partial<User>){
    const validationErrors = new Map<string, string>();

    if(!user.username?.trim()){
        validationErrors.set("username", "Username is required");
    }
    if(!user.email?.trim()){
        validationErrors.set("email", "Email is required")
    }

    return validationErrors;
}