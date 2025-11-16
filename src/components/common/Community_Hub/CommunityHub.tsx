import { NavLink } from "react-router";
import { Button } from "../ui/Button";
import { DiscussionForm } from "./DiscussionForm/DiscussionForm";
import { usePosts } from "../../../hooks/usePosts";
import { useAllGames } from "../../../hooks/useAllGames";


export function CommunityHub() {
  const { groupedPosts, deletePost, fetchPosts } = usePosts([]);
  const { games } = useAllGames([]);


  return (
    <div className="flex gap-10 pl-10">
      <div className="flex-1">
        {groupedPosts.length === 0 ? (
          <p className="text-white text-lg">No posts yet. Create the first one!</p>
        ) : (
          <ul className="space-y-8">
            {groupedPosts.map((game) => (
              <li key={game.gameID} className="text-white">
                <div className="mb-4">
                  <NavLink to={`/CommunityHub/${game.gameID}`} end>
                    <Button className="text-gray-400 hover:bg-white hover:text-black text-lg font-semibold">
                      {game.gameName}
                    </Button>
                  </NavLink>
                </div>

                <ul className="space-y-4 pl-6">
                  {game.posts.map((post) => (
                    <li key={post.postID} className="relative">
                      <Button
                        onClick={() => deletePost(post.postID!)}
                        className="absolute bottom-4 right-4 bg-blue-900 hover:bg-indigo-950 text-white p-3 rounded-lg">
                        Delete
                      </Button>
                      <NavLink
                        to={`/CommunityHub/${game.gameID}/${post.postID}`}
                        end
                        className="block w-full text-left cursor-pointer p-4 rounded duration-300 hover:bg-white hover:text-black"
                      >
                        <b className="text-xl">{post.postTitle}</b>
                        <p className="pt-3 pb-2">{post.postMessage}</p>
                        <div className="text-sm">
                          <span>
                            {post.dateCreated
                              ? new Date(post.dateCreated).toLocaleDateString()
                              : "Just now"}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{post.likes ?? 0} likes</span>
                          <span className="mx-2">•</span>
                          <span>{post.userName}</span>
                        </div>
                      </NavLink>
                      <hr className="border-t border-gray-700 my-2" />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 max-w-md pr-10">
        <DiscussionForm
          formMode="create"
          onCreateDiscussion={async () => {
            await fetchPosts();
          }}
          games={games}
        />
      </div>
    </div>
  );
}