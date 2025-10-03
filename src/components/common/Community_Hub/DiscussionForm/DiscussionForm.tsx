import { useEffect, useState } from "react";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { Select } from "../../ui/Select";
import type { Post, DiscussionPost } from "../../types/posts";
import { GameNames } from "../../types/GameNames";



interface DiscussionFormProps {
    onCreateDiscussion: (discussionPost: DiscussionPost) => void;
    games: Post[];
}

export function DiscussionForm({ onCreateDiscussion }: DiscussionFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    if (title.length == 0 || message.length == 0 || user.length == 0) {
      setError("Please fill out all fields before submitting.");
    } else {
      setError(null);
    }
  }, [title, message, user]);

  const handleSubmit = (formData: FormData) => {
    if (error) return;

    const newPost = {
        gameName: selectedGame,
        postID: Date.now(),
        userName: user,
        dateCreated: new Date().toLocaleDateString(),
        postMessage: message,
        postTitle: title,
        likes: 0,
    };

    onCreateDiscussion(newPost);

    setTitle("");
    setMessage("");
    setUser("");
    setSelectedGame("");
  };

  return (
    <div className="bg-grey-900 text-black p-7 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Create a Discussion
      </h2>
      <form
        action={handleSubmit}
        id="form"
        className="flex flex-col space-y-4"
      >
        <div>
            <Select 
                name="gameName"
                aria-label="Select Game"
                onChange={(e) => setSelectedGame(e.target.value)}>
                {Object.values(GameNames).map((x) => (
                    <option key={x}>{x}</option>
                ))}
            </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Title</label>
          <Input
            placeholder="Enter post title"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">
            Post Message
          </label>
          <Textarea
            placeholder="Write your message..."
            name="postMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[100px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Username</label>
          <Input
            placeholder="Your name"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button
          type="submit"
          className="bg-blue-900 hover:bg-indigo-950 text-white font-semibold py-2 rounded-lg transition"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
