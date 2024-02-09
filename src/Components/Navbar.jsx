import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";


function Navbar(){
    const {currentUser} = useContext(AuthContext);
    return(
       <div className="navbar">
            <span className="logo">What's Up</span>
            <div className="user">
                <img src="https://impulse.aarafacademy.com/uploads/samples/b1.jpg" alt="User" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)} >LogOut</button>
            </div>
       </div>
    );
}

export default Navbar;