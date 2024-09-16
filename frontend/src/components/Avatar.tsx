interface AvatarInput{
    username: string,
    dimension : string
}

function Avatar({ username,dimension } : AvatarInput) {
    return (
        <div className={`rounded-full h-${dimension} w-${dimension} border-2 border-slate-500 border-solid flex justify-center items-center `}>
            {username[0].toUpperCase()}
        </div>
    );
}
export default Avatar;