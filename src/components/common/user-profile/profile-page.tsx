import type {User} from "../types/users";
import { useState } from "react";
import img1 from '../../data/images/noprofile.jpg';
import { getUsers } from "../../../apis/userProfile/userProfile";

const users: User[] = getUsers();
const user_1 = users[0]

export function Profile(){

    const [showUpdate, setShowUpdate] = useState(false);
    const [user, setUser] = useState(user_1);
    const [updatedUser, setUpdatedUser] = useState(user_1);

    function handleUpdate(){
        setShowUpdate(true);
        setUpdatedUser(user);
    }
    function handleSaveProfile(e){
        e.preventDefault();
        
        if(updatedUser.username === "" || updatedUser.email === ""){
            alert("Username/Email cannot be empty!");
            return;
        }
        setUser(updatedUser);
        setShowUpdate(false);
    }

    return(
        <div >
            <h1 className="flex justify-center items-center text-4xl mb-4">My Profile</h1>
            <div className="flex flex-col justify-center rounded-2xl border bg-white p-4 bg-linear-to-br 
                            from-sky-500 via-blue-900 to-indigo-950 text-white max-w-md mx-auto">
                <div className="flex items-center justify-center">
                <img className="object-cover rounded-full aspect-square w-30 h-30"src={user.avatarUrl ? user.avatarUrl: img1} alt={`${user.username}'s avatar`}/>
                </div>
                <p className="flex justify-center my-4">USERNAME: {user.username}</p>
                <p className="flex justify-center my-4">EMAIL: {user.email}</p>
                <p className="flex justify-center my-4">AVATARURL: {user.avatarUrl}</p>
                <p className="flex justify-center my-4">BIO: {user.bio}</p>
            </div>
            <div className="flex justify-center">
                <button className="flex justify-center align-center my-4 h-10 w-32 rounded-2xl 
                                    bg-linear-to-br from-sky-950 via-blue-900 to-indigo-500 text-white
                                    hover:bg-linear-blue-900"
                                    onClick={() => handleUpdate()}>
                                        <div className="flex h-full w-full items-center justify-center 
                                        bg-gray-900 rounded-full hover:bg-blue-500">
                                            Update Profile
                                        </div>
                </button>
            </div>

            {showUpdate && 
                <form id="form" className="flex flex-col justify-center rounded-2xl border bg-white p-4 bg-linear-to-br 
                            from-sky-950 via-blue-900 to-indigo-500 text-white max-w-md mx-auto">
                    <div className="flex flex-col justify-center">
                        <label>
                            Username: <input type="text" placeholder="Enter new username"value={updatedUser.username}  onChange={(e) => setUpdatedUser(u => ({...u, username: e.target.value }))} className="border rounded p-1 my-2 w-full"/>
                        </label>
                        <label>
                            Email: <input type="email" value={updatedUser.email} placeholder="Enter new email" onChange={(e) =>setUpdatedUser(u => ({...u, email: e.target.value}))} className="border rounded p-1 my-2 w-full"/>
                        </label>
                        <label>
                            AvatarURL: <input type="url" value={updatedUser.avatarUrl} placeholder="Enter new url" onChange={(e) =>setUpdatedUser(u => ({...u, avatarUrl: e.target.value}))} className="border rounded p-1 my-2 w-full"/>
                        </label>
                        <label>
                            Bio: <textarea value={updatedUser.bio} placeholder="Enter new bio"onChange={(e) =>setUpdatedUser(u => ({...u, bio: e.target.value}))} className="border rounded p-1 my-2 w-full"/>
                        </label>
                        <div className="flex justify-center">
                            <button className="flex justify-center align-center my-2 h-10 w-32 rounded-2xl 
                                        bg-linear-to-br from-sky-950 via-blue-900 to-indigo-500 text-white
                                        hover:bg-linear-blue-900" 
                                        type="submit" onClick={handleSaveProfile}>
                                            <div className="flex h-full w-full items-center justify-center 
                                            bg-gray-900 rounded-full hover:bg-blue-500">
                                                Save Profile
                                            </div>
                            </button>
                        </div>
                    </div>
                </form> 
            }
        </div>
    )
}

