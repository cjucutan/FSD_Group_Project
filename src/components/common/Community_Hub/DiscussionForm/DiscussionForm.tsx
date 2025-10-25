import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { Select } from "../../ui/Select";
import type { Post, DiscussionPost } from "../../types/posts";
import { GameNames } from "../../types/GameNames";
import { useDiscussionForm } from "../../../../hooks/useDiscussionForm";

interface DiscussionFormProps {
    formMode: "create";
    games: Post[];
    onCreateDiscussion: (discussion: DiscussionPost) => void;
}

export function DiscussionForm({ formMode, onCreateDiscussion }: DiscussionFormProps) {
  const {
    title,
    setTitle,
    message,
    setMessage,
    user,
    setUser,
    selectedGame,
    setSelectedGame,
    form,
    onSubmitForm,
  } = useDiscussionForm();

  const handleSubmit = async () => {
    const discussion = await onSubmitForm(formMode);
    if (discussion) {
      onCreateDiscussion(discussion);
    }
  };

  return (
    <div className="bg-grey-90 text-black p-7 rounded-xl shadow-lg w-full">
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
                aria-label="gamName"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}>
                <option value="">Select a Game</option>
                {Object.values(GameNames).map((gameName) => (
                    <option key={gameName} value={gameName}>
                        {gameName}
                    </option>
                ))}
            </Select>
            {form.errors.has("gameName") && <span className="text-red-500 font-semibold">{form.errors.get("gameName")}</span>}
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
          {form.errors.has("postTitle") && <span className="text-red-500 font-semibold">{form.errors.get("postTitle")}</span>}
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
          {form.errors.has("postMessage") && <span className="text-red-500 font-semibold">{form.errors.get("postMessage")}</span>}
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
          {form.errors.has("userName") && <span className="text-red-500 font-semibold">{form.errors.get("userName")}</span>}
        </div>

        <Button
          type="button"
          onClick={() => handleSubmit()}
          className="bg-blue-900 hover:bg-indigo-950 text-white font-semibold py-2 rounded-lg transition"
        >
          Create
        </Button>
      </form>
    </div>
  );
}