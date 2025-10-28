import type {User} from "../types/users";
import { useState } from "react";
import img1 from '../../data/images/noprofile.jpg';
import * as UserService from "../../../apis/userProfile/userProfile";
import { useFormState } from "../../../hooks/useForm";
import { validateUser } from "../../../services/userProfile/userProfileService";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

const users: User[] = UserService.getUsers();
const user_1 = users[0]

export function Profile(){

    const [showUpdate, setShowUpdate] = useState(false);
    const [user, setUser] = useState(user_1);
    const {formData, handleChange, errors, setErrors} = useFormState(user);

    function handleUpdate(){
        setShowUpdate(true);
    }
    async function handleSaveProfile (e){
        e.preventDefault();
        
        const validationErrors = await validateUser(formData);
        setErrors(validationErrors);

        if (validationErrors.size > 0){
            return;
        }
        
        setUser(formData as User);
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
                <Button 
                    className="flex justify-center align-center my-4 h-10 w-32 rounded-2xl 
                                bg-linear-to-br from-sky-950 via-blue-900 to-indigo-500 text-white
                                hover:bg-linear-blue-900"
                    onClick={() => handleUpdate()}
                    type="button">
                        <div className="flex h-full w-full items-center justify-center 
                        bg-gray-900 rounded-full hover:bg-blue-500">
                            Update Profile
                        </div>
                </Button>
            </div>

            {showUpdate && 
                <form id="form" className="flex flex-col justify-center rounded-2xl border bg-white p-4 bg-linear-to-br 
                            from-sky-950 via-blue-900 to-indigo-500 text-white max-w-md mx-auto">
                    <div className="flex flex-col justify-center">
                        <label>
                            Username: 
                            <Input type="text" 
                                   placeholder="Enter new username"
                                   value={formData.username}  
                                   onChange={(e) => handleChange("username", e.target.value)} 
                                   className="text-black border rounded p-1 my-2 w-full"
                            />
                        {errors.has("username") && <span className="text-red-500 font-semibold">{errors.get("username")}</span>}
                        </label>
                        <label>
                            Email:
                            <Input type="email" 
                                   value={formData.email} 
                                   placeholder="Enter new email" 
                                   onChange={(e) => handleChange("email", e.target.value)} 
                                   className="text-black border rounded p-1 my-2 w-full"
                            />
                        {errors.has("email") && <span className="text-red-500 font-semibold">{errors.get("email")}</span>}
                        </label>
                        <label>
                            AvatarURL: 
                            <Input type="url" 
                                   value={formData.avatarUrl}
                                   placeholder="Enter new url" 
                                   onChange={(e) => handleChange("avatarUrl", e.target.value)} 
                                   className="text-black border rounded p-1 my-2 w-full"
                            />
                        </label>
                        <label>
                            Bio: 
                            <Textarea value={formData.bio} 
                                      placeholder="Enter new bio" 
                                      onChange={(e) => handleChange("bio", e.target.value)} 
                                      className="text-black border rounded p-1 my-2 w-full"
                            />
                        </label>
                        <div className="flex justify-center">
                            <Button 
                                className="flex justify-center align-center my-2 h-10 w-32 rounded-2xl 
                                        bg-linear-to-br from-sky-950 via-blue-900 to-indigo-500 text-white
                                        hover:bg-linear-blue-900" 
                                        type="submit" onClick={handleSaveProfile}>
                                            <div className="flex h-full w-full items-center justify-center 
                                            bg-gray-900 rounded-full hover:bg-blue-500">
                                                Save Profile
                                            </div>
                            </Button>
                        </div>
                    </div>
                </form> 
            }
        </div>
    )
}

