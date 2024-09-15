interface boxInput {
    label: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

export const InputBox = ({ label,placeholder, onChange, type} : boxInput) => {
    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-2/3 mb-4">
            <label className="text-xl font-medium text-gray-900">{label}</label>
            </div>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg block p-2.5 w-2/3 mb-4"
                placeholder={placeholder}
                onChange={onChange}
                type={type || "text"}
                autoComplete="off"
            />
        </div>
    )
}