import { Link } from "react-router-dom"

export const NoBlogShow = () => {
    return (
        <div className="flex items-center justify-center h-[800px]">
            <div className="text-center p-20 bg-white rounded shadow-md">
                <div className="text-3xl font-bold mb-4">Oops!</div>
                <div className="text-xl mb-4">It looks like there are no blogs here yet.</div>
                <div className="mt-6">
                    <Link to="/publish" className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800">
                        Write Your First Blog
                    </Link>
                </div>
            </div>
        </div>
    )
}