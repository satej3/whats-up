import React, { useContext } from "react";
import addUser from '../img/add-user.png';
import camera from '../img/camera.png';
import more from '../img/more.png';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { ChatContext } from "../context/ChatContext";


function Chat(){
    const {data, dispatch} = useContext(ChatContext);
    console.log("chatcontext data=",data)

    return(
       <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName}</span>
                <div className="chatIcons">
                    <img src={camera} alt="camera" />
                    <img src={addUser} alt="adduser" />
                    <img src={more} alt="more" />
                </div>
            </div>

            <Messages />
            <MessageInput />
       </div>
    );
}

export default Chat;