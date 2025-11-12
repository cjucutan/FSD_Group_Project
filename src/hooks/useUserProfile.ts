import { useState, useEffect } from "react";
import * as UserService from "../services/userProfile/userProfileService";
import type { User } from "../components/common/types/users";

export function useUserProfile(){
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers(){
            const user_data = await UserService.getUsers();
        setUsers(user_data);
        }
        fetchUsers();
    }, []);

    return{users}
}