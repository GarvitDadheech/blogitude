import { useContext, useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Quote } from "../components/Quote"
import { SignInBody } from "@garvit_dadheech/blogitude"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/Loader"
import UserContext from "../context/UserContext"

export const Signin = () => {
    const [postInputs,setPostInputs] = useState<SignInBody>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const userContext = useContext(UserContext);
    if (!userContext) {
        return
    }
    const { setUser } = userContext;
    
    async function handleClick() {
        setLoading(true);
        try{
            const response = await axios.post(`${BACKEND_URL}/user/signin`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);            
            setUser(response.data.name);
            navigate("/blogs");
        }
        catch(e) {
            setErrorMessage("Sorry, registration failed. Please try again.");
            setShowErrorModal(true);
        }
        finally {
            setLoading(false);
        }
    }

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
                <Button content="Sign In" handleClick={handleClick}/>
                {loading && <Loader />}
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