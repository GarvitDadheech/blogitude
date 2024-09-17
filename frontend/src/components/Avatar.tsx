import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
interface AvatarInput {
    username?: string; 
    dimension: string;
}

const Avatar: React.FC<AvatarInput> = ({ username, dimension }) => {
    const userContext = useContext(UserContext);
    if (userContext) {
        const displayUsername = username || userContext.user;

        return (
            <div
                className={`rounded-full border-2 border-slate-500 border-solid flex justify-center items-center ${dimension}`}
            >
                {displayUsername ? displayUsername[0].toUpperCase() : '?'}
            </div>
        );
    }
};

export default Avatar;
