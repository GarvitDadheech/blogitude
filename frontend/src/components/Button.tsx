interface buttonInput {
    content: string
}

export const Button = ({content} : buttonInput) => {
    return(
        <button className="bg-slate-900 text-white w-2/3 p-2.5 mt-4 rounded-lg text-xl">{content}</button>
    )
}