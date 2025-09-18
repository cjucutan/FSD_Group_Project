import data from '../../data/users.json';

interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    bio: string;
    location: string;
}

const users: User[] = data;

export default function UserProfileSection() {
    return (
        <section className="user-profile-list">
            {users.map((user) => (
            <div key={user.id} className="user-profile-card">
            <img src={user.avatarUrl} alt={`${user.username}'s avatar`} className="avatar"/>
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
            </div>
        ))} 
        </section>
    );
}

// Pat's comments*******
// show only two users
// include: vatar, username, and bio 
// display flex, justify content, space between