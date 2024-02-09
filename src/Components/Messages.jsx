import React, { useContext, useEffect, useState } from "react";
import Messsage from './Message';
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";


function Messages(){
    const [messages, setMessages] = useState([]);
    const {data, dispatch} = useContext(ChatContext);
    
    useEffect( () => {
        const unsub = onSnapshot( doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            console.log(doc.data())
        } );
        return () => {
            unsub();
        }
    }, [data.chatId]);

    

    return(
       <div className="messages">
            {messages.map( (m) => (
                <Messsage message={m} key={m.id} />
            ))}
       </div>
    );
}

export default Messages;