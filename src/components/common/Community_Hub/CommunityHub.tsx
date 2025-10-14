import { NavLink } from "react-router";
import post from "../../data/posts.json";
import { Button } from "../ui/Button";
import { DiscussionForm } from "./DiscussionForm/DiscussionForm";
import { useState } from "react";
import type { Post, DiscussionPost } from "../types/posts";





const posts = post as Post[];

export function CommunityHub() {
  const [games, setGames] = useState<Post[]>(posts);

  const handleCreateDiscussion = (newPost: DiscussionPost) => {
    const updated = [...games];
    updated[0].discussion.push(newPost);
    setGames(updated);
  };

  const listItems = posts.map(game => (
    <li key={game.gameID} className="flex space-x-8 pl-10 text-white max-w-md ">
        <ul className="flex-1 space-y-2">
            {game.discussion.map(discussion => (
                <li key={discussion.postID} >
                    <div className="">
                        <div>
                            <NavLink to={`/CommunityHub/${game.gameID}`} end>
                              <Button className=" block pb-2 text-gray-400 hover:bg-white hover:text-black">{game.gameName}</Button>
                            </NavLink>
                            <NavLink to={`/CommunityHub/${game.gameID}/${discussion.postID}`} end
                              className="block w-full text-left cursor-pointer p-2 rounded duration-300 hover:bg-white hover:text-black">
                              <b className="text-xl">{discussion.postTitle}</b>
                              <p className="pt-5 pb-2">{discussion.postMessage}</p>
                            </NavLink>
                              <small>{discussion.dateCreated} • {discussion.likes} likes</small>
                              <small className="pl-6">{discussion.userName}</small>
                              <hr className="border-t border-white my-2 "/>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </li>
  ));

  return (
  <div className="flex gap-10 pl-10">
    <div className="flex-1">
      <ul>{listItems}</ul>
    </div>
    <div className="flex-1 max-w-md pr-10">
      <DiscussionForm onCreateDiscussion={handleCreateDiscussion} games={games} />
    </div>
  </div>
);

}
