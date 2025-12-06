import type {User} from "../types/users";
import { useEffect, useState } from "react";
import img1 from '../../data/images/noprofile.jpg';
import { useFormState } from "../../../hooks/useForm";
import { validateUser } from "../../../services/userProfile/userProfileService";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { useUserProfile } from "../../../hooks/useUserProfile";
import * as UserService from "../../../services/userProfile/userProfileService";
import { useAuth } from "@clerk/clerk-react";


export function Profile(){

    const { currentUser } = useUserProfile();
    const { getToken } = useAuth()
    const [showUpdate, setShowUpdate] = useState(false);
    const {formData, handleChange, errors, setErrors, setFormData} = useFormState<User>({
        id: "",
        username: "",
        email: "",
        avatarUrl: "",
        bio: "",
        location: ""
    });

    useEffect(() => {
        if(currentUser) {
            setFormData({ ...currentUser});
        }
    },[currentUser, setFormData])

    function handleUpdate(){
        setShowUpdate(true);
    }
    async function handleSaveProfile (e: React.FormEvent){
        e.preventDefault();
        
        const validationErrors = await validateUser(formData);
        setErrors(validationErrors);

        if (validationErrors.size > 0){
            return;
        }
        
        try{
            const sessionToken = await getToken();
            if (sessionToken){
                await UserService.updateUser(formData, sessionToken);
                setShowUpdate(false);
            }
        } catch(error){
            console.error("User cannot be updated", error)
        }
    }

    async function handleDeleteProfile(){
        try{
            const sessionToken = await getToken()
            if (!sessionToken){
                return;
            }
            if (formData.id !== currentUser?.id){
                console.error("Cannot delete user, IDs do not match");
                return;
            }

            await UserService.deleteUser(formData.id, sessionToken)
            setShowUpdate(false);
            alert("User deleted")
        }catch(error){
            console.error("User cannot be deleted", error);
            alert("User deletion failed")
        }
    }
    
    if(!currentUser){
        return <div>Loading your profile...</div>
    }

    return(
        <div >
            <h1 className="flex justify-center items-center text-4xl mb-4">My Profile</h1>
            <div className="flex flex-col justify-center rounded-2xl border bg-white p-4 bg-linear-to-br 
                            from-sky-500 via-blue-900 to-indigo-950 text-white max-w-md mx-auto">
                <div className="flex items-center justify-center">
                <img className="object-cover rounded-full aspect-square w-30 h-30"src={formData.avatarUrl ? formData.avatarUrl: img1} alt={`${formData.username}'s avatar`}/>
                </div>
                <p className="flex justify-center my-4">USERNAME: {formData.username}</p>
                <p className="flex justify-center my-4">EMAIL: {formData.email}</p>
                <p className="flex justify-center my-4">AVATARURL: {formData.avatarUrl}</p>
                <p className="flex justify-center my-4">BIO: {formData.bio}</p>
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
                                   value={formData.email ?? ""} 
                                   placeholder="Enter new email" 
                                   onChange={(e) => handleChange("email", e.target.value)} 
                                   className="text-black border rounded p-1 my-2 w-full"
                            />
                        {errors.has("email") && <span className="text-red-500 font-semibold">{errors.get("email")}</span>}
                        </label>
                        <label>
                            AvatarURL: 
                            <Input type="url" 
                                   value={formData.avatarUrl ?? ""}
                                   placeholder="Enter new url" 
                                   onChange={(e) => handleChange("avatarUrl", e.target.value)} 
                                   className="text-black border rounded p-1 my-2 w-full"
                            />
                        </label>
                        <label>
                            Bio: 
                            <Textarea value={formData.bio ?? ""} 
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
                                type="submit" 
                                onClick={handleSaveProfile}>
                                    <div className="flex h-full w-full items-center justify-center 
                                    bg-gray-900 rounded-full hover:bg-blue-500">
                                        Save Profile
                                    </div>
                            </Button>
                            <Button 
                                className="flex justify-center align-center my-2 h-10 w-32 rounded-2xl 
                                        bg-linear-to-br from-sky-950 via-blue-900 to-indigo-500 text-white
                                        hover:bg-linear-blue-900" 
                                type="button" 
                                onClick={handleDeleteProfile}>
                                    <div className="flex h-full w-full items-center justify-center 
                                    bg-gray-900 rounded-full hover:bg-blue-500">
                                        Delete Profile
                                    </div>
                            </Button>
                        </div>
                    </div>
                </form> 
            }
        </div>
    )
}

