import React, { useContext, useState } from "react";
import Attach from '../img/attachment.png';
import Image from '../img/picture.png';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, updateDoc, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { db } from "../firebase/firebase";

function MessageInput(){
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    console.log("data=", data);
    

    const handleSend = async () => {
        if (img) {
            alert("Currently this feature is under development.. we will be back with it soon.");
        } else {
            const chatRef = doc(db, "chats", data.chatId);
            const chatSnap = await getDoc(chatRef);
    
            if (chatSnap.exists()) {
                await updateDoc(chatRef, {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    })
                });
            } else {
                // Document doesn't exist, create it
                await setDoc(chatRef, {
                    messages: [{
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }]
                });
            }
        }

        await updateDoc( doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        } )
        
        
        await updateDoc( doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        } )
    
        setText("");
        setImg(null);
    };
    

    return(
       <div className="input">
            <input type="text" value={text} placeholder="Type something..." onChange={e=> setText(e.target.value)} />
            <div className="send">
                <img src={Attach} alt="Attach" />
                <input type="file" style={{display: 'none'} } id="file" onChange={e=> setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img src={Image} alt="Image" />
                </label>
                <button onClick={handleSend} >Send</button>
            </div>
       </div>
    );
}

export default MessageInput;