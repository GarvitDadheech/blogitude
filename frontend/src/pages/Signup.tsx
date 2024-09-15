import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { SignUpBody } from "@garvit_dadheech/blogitude"

export const Signup = () => {

    const [postInputs,setPostInputs] = useState<SignUpBody>({
        name: "",
        email: "",
        password: ""
    })

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center">
                <Heading headingContent="Create an Account" subHeadingContent="Already have an Account?" isSignUp={true}/>
                <InputBox label="Name" placeholder="Garvit Dadheech" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}/>
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
                <Button content="Sign Up"/>
            </div>
            <Quote/>
        </div>
    )
}