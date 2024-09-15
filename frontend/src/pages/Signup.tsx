import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { SignUpBody } from "@garvit_dadheech/blogitude"
import axios from "axios"
import {BACKEND_URL} from "../../config"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const [postInputs,setPostInputs] = useState<SignUpBody>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function handleClick() {
        try{
            const response = await axios.post(`${BACKEND_URL}/user/signup`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e) {
            setErrorMessage("Sorry, registration failed. Please try again.");
            setShowErrorModal(true);
        }

    }

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
                <Button content="Sign Up" handleClick={handleClick}/>
                {showErrorModal && (
                    <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-500 rounded-lg">
                        {errorMessage}
                    </div>
                )}
            </div>
            <Quote/>
        </div>
    )
}