import { Appbar } from "../components/Appbar"
import { PaginatedBlogList } from "../components/PaginatedBlogList"


export const AllBlogs = () => {
    return(
        <div>
            <Appbar/>
            <PaginatedBlogList/>
        </div>
    )
}