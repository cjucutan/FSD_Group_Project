import { useEffect, useState } from "react";
import * as DiscussionService from "../services/communityHub/discussionService";
import type { Post } from "../components/common/types/posts";
import { toast } from "react-toastify";
import { useFormState } from "./useForm";
import *  as userService from "../services/userProfile/userProfileService";
import type { User } from  "../components/common/types/users";

const DEFAULT_DISCUSSION_POST = {
    postID: "",
    gameID: "",
    gameName: "",
    userName: "",
    dateCreated: "",
    postMessage: "",
    postTitle: "",
    likes: 0,
}

export function useDiscussionForm() {
    const [discussionData, setDiscussionData] = useState<Post>(DEFAULT_DISCUSSION_POST);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [selectedGame, setSelectedGame] = useState("");

    const form = useFormState ({title: "", message: "", user: "",});

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function loadUsers() {
            const data = await userService.getUsers();   // returns Promise<User[]>
            setUsers(data);
        }
        loadUsers();
    }, []);

    const currentUser = users[0];

    useEffect(() => {
        if(title.length > 0) {
            form.clearFieldError(title);
        }
        if(message.length > 0) {
            form.clearFieldError(message);
        }
        if(user.length > 0) {
            form.clearFieldError(user);
        }
    }, [title, message, user]);

    const handleFormChange = (field: string, value: unknown) => {
        form.clearFieldError(field);
        setDiscussionData({
        ...discussionData,
        [field]: value,
        });
    };

    const onReset = () => {
        setDiscussionData(DEFAULT_DISCUSSION_POST);
        setTitle("");
        setMessage("");
        setUser("");
        form.clearAllErrors();
    };

    const onSubmitForm = async (formMode: "create" | "edit", gameID: string, gameName: string) => {
        const discussionErrors = await DiscussionService.validatePost({postTitle: title, postMessage: message}, selectedGame)
        form.setErrors(discussionErrors);
        if (discussionErrors.size == 0) {
            const discussion: Post = {
                gameID: gameID,
                gameName: gameName,
                postTitle: title,
                postMessage: message,
                userName: user || currentUser?.username || "Guest",
            };
            let toastMessage = `Successfully created a new discussion post ${discussion.postTitle}!`;
            let postId = discussion.postID;
            if (formMode == "create") {
                const createNewDiscussion = await DiscussionService.createNewPost(discussion)
                if (createNewDiscussion) {
                    postId = createNewDiscussion.gameID
                }
            }
            toast(toastMessage, {
                position: "bottom-center",
                theme: "light",
                hideProgressBar: true,
                closeButton: false,
                autoClose: 2500,
            });
            onReset();
            return discussion;
        }
        return null;
    };
    return { discussionData, title, setTitle, message, setMessage, user, setUser, selectedGame, setSelectedGame, form, onReset, onSubmitForm, handleFormChange, currentUser, };

}