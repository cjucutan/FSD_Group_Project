import { useState, useEffect } from "react";
import * as UserService from "../services/userProfile/userProfileService";
import type { User } from "../components/common/types/users";
import { useUser } from "@clerk/clerk-react";

export function useUserProfile(){
    const { user } = useUser();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchCurrentUser(){
            if (!user){
                return
            }
            try{
                const userData = await UserService.getUserbyId(user.id);
                setCurrentUser(userData);
            }catch (error){
                console.error("Failed to get user", error)
            }
        }
        fetchCurrentUser();
    }, [user]);

    return{currentUser}
}