import { useEffect, useState } from "react";
import * as DiscussionService from "../services/communityHub/discussionService";
import type { DiscussionPost } from "../components/common/types/posts";
import { toast } from "react-toastify";
import { useFormState } from "./useForm";

const DEFAULT_DISCUSSION_POST = {
    postID: 0,
    userName: "",
    dateCreated: "",
    postMessage: "",
    postTitle: "",
    likes: 0,
}

export function useDiscussionForm() {
    const [discussionData, setDiscussionData] = useState<DiscussionPost>(DEFAULT_DISCUSSION_POST);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [selectedGame, setSelectedGame] = useState("");

    const form = useFormState ({title: "", message: "", user: "",});

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

    const onReset = () => {
        setDiscussionData(DEFAULT_DISCUSSION_POST);
        setTitle("");
        setMessage("");
        setUser("");
        form.clearAllErrors();
    };

    const onSubmitForm = async (formMode: "create") => {
        const discussionErrors = await DiscussionService.validateDiscussion({userName: user, postTitle: title, postMessage: message}, selectedGame)
        form.setErrors(discussionErrors);
        if (discussionErrors.size == 0) {
            const discussion: DiscussionPost = {
                ...discussionData,
                postTitle: title,
                postMessage: message,
                userName: user,
            };
            let toastMessage = `Successfully created a new discussion post ${discussion.postTitle}!`;
            let postId = discussion.postID;
            if (formMode == "create") {
                const gameID = 1;
                const gameName = selectedGame as any;
                const createNewDiscussion = await DiscussionService.createNewDiscussion(discussion, gameID, gameName)
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
            return discussion
        }
        return null;
    };
    return { discussionData, title, setTitle, message, setMessage, user, setUser, selectedGame, setSelectedGame, form, onReset, onSubmitForm, };

}