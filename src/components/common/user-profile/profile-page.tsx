import type {User} from "../types/users";
import data from "../../data/users.json";
import { useState } from "react";

const users: User[] = data;

const user_1: User = users[0];

export function Profile(){

    const [user, setUser] = useState(user_1);

    function handleUserChange(e){
        setUser(u => ({...u, username: e.target.value}))
    }

    function handleEmailChange(e){
        setUser(u => ({...u, email: e.target.value}))
    }
    function handleAvatarUrlChange(e){
        setUser(u => ({...u, avatarUrl: e.target.value}))
    }
    function handleBioChange(e){
        setUser(u => ({...u, bio: e.target.value}))
    }

    return(
        <div >
            <h1 className="flex justify-center text-4xl mb-4">My Profile</h1>
            <p className="flex justify-center my-4">USERNAME: {user.username}</p>
            <p className="flex justify-center my-4">EMAIL: {user.email}</p>
            <p className="flex justify-center my-4">AVATARURL: {user.avatarUrl}</p>
            <p className="flex justify-center my-4">BIO: {user.bio}</p>
            <div className="flex justify-center">
                <button onClick={() => handleUpdate()} >Update Profile</button>
            </div>

        </div>
    )
}

