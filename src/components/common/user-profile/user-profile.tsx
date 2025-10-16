import { userData } from '../../../../src/components/data/user_data';
import img1 from '../../data/images/noprofile.jpg';
import type { User } from '../types/users';

const users: User[] = userData;

export default function UserProfileSection() {
    return (
        <div className='flex items-center justify-center'>
        <section className="flex flex-col justify-center text-center space-y-6 rounded-2xl border bg-white p-4 bg-linear-to-br from-sky-500 via-blue-900 to-indigo-950 text-white">
            {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center space-y-4">
            <h2 className="text-4xl font-bold">{user.username}</h2>
            <img src={img1} height="300" width="300"alt={`${user.username}'s avatar`}/>
            <p>{user.bio}</p>
            </div>
        ))}
            <ul className="flex text-blue-400 justify-center">
                <li>
                    <a href="*" className="mx-8">Log in</a>
                </li>
                <li>
                    <a href="*" className="mx-8">Sign Up</a>
                </li>
            </ul>
        </section>
        </div>
    );
}