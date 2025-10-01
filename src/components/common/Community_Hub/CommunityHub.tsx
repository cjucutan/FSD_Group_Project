import post from "../../data/posts.json"

interface Post {
    postID: string;
    userName: string;
    dateCreated: string;
    postMessage: string;
    likes: number;
}

const posts: Post[] = post

export function CommunityHub () {
    const listItems = posts.map (post =>
        <li key={post.postID}>
            <div>
                    <b> {post.userName} </b>
                    <p>{'' + post.postMessage + ''}</p>
                    <small>{'' + post.dateCreated + ''} • {' ' + post.likes + ''} likes</small>
            </div>
        </li>
    );
    return <ul>{listItems}</ul>
}