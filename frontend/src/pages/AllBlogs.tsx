import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const AllBlogs = () => {
    return(
        <div>
            <Appbar/>
            <div className="w-screen flex justify-center items-center flex-col">
                <BlogCard authorname="Garvit" date="13-3-2015" content="hi i am i dont know what is happening with me as i am fat and i am think at the same time what is this called??" title="Who is the mother of our nation?? The mystery solved.."/>
                <BlogCard authorname="Garvit" date="13-3-2015" content="hi i am i dont know what is happening with me as i am fat and i am think at the same time what is this called??" title="Who is the mother of our nation?? The mystery solved.."/>
                <BlogCard authorname="Garvit" date="13-3-2015" content="hi i am i dont know what is happening with me as i am fat and i am think at the same time what is this called??" title="Who is the mother of our nation?? The mystery solved.."/>
                <BlogCard authorname="Garvit" date="13-3-2015" content="hi i am i dont know what is happening with me as i am fat and i am think at the same time what is this called??" title="Who is the mother of our nation?? The mystery solved.."/>
                <BlogCard authorname="Garvit" date="13-3-2015" content="hi i am i dont know what is happening with me as i am fat and i am think at the same time what is this called??" title="Who is the mother of our nation?? The mystery solved.."/>
            </div>
        </div>
    )
}