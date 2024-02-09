import React, { useContext, useState } from "react";
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from 'firebase/firestore';
import {db} from '../firebase/firebase';
import {AuthContext} from '../context/AuthContext';

function Search(){

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const handleSearch = async () =>{
        const q = query( collection(db, "users"), where("displayName", "==", userName));
        try{

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) =>{
                setUser(doc.data());
            })
        }catch(error){
            alert("Error while searching..");
            setErr(true);
        }
            
    }

    const handleKey = e =>{
        e.code == "Enter" && handleSearch();
    }

    const handleSelect = async () =>{
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()){
                //create a chat in chats collection if chats not found..
                await setDoc(doc(db, "chats", combinedId), {messages : []});

                await updateDoc( doc(db, "userChats", currentUser.uid),{
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,

                    },
                    [combinedId+".date"]: serverTimestamp()
                });
                
                await updateDoc( doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,

                    },
                    [combinedId+".date"]: serverTimestamp()
                });
            }
            
        } catch (error) {
            console.log("Error:", error);
            alert("Error while creating chats colllection..")
        }

        //close search and make empty
        setUser(null);
        setUserName("");
    }


    return(
       <div className="search">
            <div className="searchForm">
                <input type="text"
                 placeholder="Search Contact"
                 onChange={(e) => setUserName(e.target.value)}
                 onKeyDown={handleKey}
                 value={userName}
                  />
            </div>
            {err && <span>User Not Found..</span>}
            { user && <div className="userChat" onClick={handleSelect} >
                <img src="https://impulse.aarafacademy.com/uploads/samples/g1.jpg" alt="user" />
                <div className="userChatInfo" >
                    <span >{user.displayName}</span>
                </div>
            </div>}
                 
       </div>
    );
}

export default Search;