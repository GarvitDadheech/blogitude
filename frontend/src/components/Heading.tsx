import { Link } from "react-router-dom"

interface headingInput{
    headingContent: string,
    subHeadingContent: string,
    isSignUp: boolean
}

export const Heading = ({headingContent, subHeadingContent,isSignUp}: headingInput) => {
    return (
        <div className="flex flex-col">
            <div className="text-2xl font-extrabold mb-4 sm:text-3xl lg:text-5xl">{headingContent}</div>
            <div className="flex mb-10 justify-center">
                <div className="text-gray-600 font-semibold text-lg">{subHeadingContent}</div>
                <div className="underline pl-2 text-lg">{isSignUp ? <Link to="/signin">Log In</Link> : <Link to="/signup">Sign Up</Link>}</div>
            </div>
        </div>
    )
}