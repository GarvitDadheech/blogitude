import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { SignInBody } from "@garvit_dadheech/blogitude"

export const Signin = () => {
    const [postInputs,setPostInputs] = useState<SignInBody>({
        email: "",
        password: ""
    })
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center">
                <Heading headingContent="Enter Your Credentials" subHeadingContent="Don't have an Account?" isSignUp={false}/>
                <InputBox label="Email" placeholder="garvit@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}/>
                <InputBox label="Password" placeholder="" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} type="password"/>
                <Button content="Sign In"/>
            </div>
            <Quote/>
        </div>
    )
} 