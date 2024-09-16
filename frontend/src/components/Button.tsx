interface buttonInput {
    content: string,
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({content,handleClick} : buttonInput) => {
    return(
        <button className="bg-slate-900 text-white w-2/3 p-2.5 mt-4 rounded-lg text-xl hover:bg-slate-950" onClick={handleClick}>{content}</button>
    )
}