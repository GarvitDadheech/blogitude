interface boxInput {
    label: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

export const InputBox = ({ label,placeholder, onChange, type} : boxInput) => {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-2/3 mb-2">
            <label className="text-lg font-medium text-gray-900">{label}</label>
            </div>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-2/3 mb-2"
                placeholder={placeholder}
                onChange={onChange}
                type={type || "text"}
                autoComplete="off"
            />
        </div>
    )
}