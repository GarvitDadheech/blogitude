import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center">
                <Heading headingContent="Enter Your Credentials" subHeadingContent="Don't have an Account?" isSignUp={false}/>
                <InputBox label="Email" placeholder="garvit@gmail.com" onChange={() => console.log("changed")}/>
                <InputBox label="Password" placeholder="" onChange={() => console.log("changed")} type="password"/>
                <Button content="Sign In"/>
            </div>
            <Quote/>
        </div>
    )
} 