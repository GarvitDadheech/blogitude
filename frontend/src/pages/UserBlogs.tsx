import { Appbar } from "../components/Appbar"
import { PaginatedBlogList } from "../components/PaginatedBlogList"

export const UserBlogs = () => {
    return (
        <div>
            <Appbar/>
            <PaginatedBlogList isUserBlogs={true}/>
        </div>
    )
}