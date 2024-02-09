import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";


function Login(){
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            alert("Error..")
            console.log("Error: ", error);
            setErr(true);
        }

    }


    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">What's Up</span>
                <span className="title" >Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{display: 'none'}} id="file" type="file" />
                    
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an Account? <a href="/register" >Register Here</a> </p>
            </div>  
        </div>
    );

}

export default Login;