import React, { useContext, useEffect, useRef } from "react";
import user from '../img/upload-image-icon.webp'
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({message}){
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();

    useEffect( () => {
        ref.current.scrollIntoView({behavior: "smooth"})
    }, [message]);

    console.log(message);
    return(
       <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"} `}>
            <div className="messageInfo">
                <img 
                // src=message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
                // above line is to show dp of sender or user based on condition
                src="https://impulse.aarafacademy.com/uploads/samples/b1.jpg"
                 alt="owner" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {/* <img src={user} alt="" />  */}
            </div>
       </div>  
    );
}

export default Message;