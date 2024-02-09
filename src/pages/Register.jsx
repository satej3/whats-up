import React from "react";
import uploadIcon from '../img/upload-image-icon.webp';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db } from '../firebase/firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";


const Register = () =>{

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        const auth = getAuth();
        try{
            //create user
            const res = await createUserWithEmailAndPassword  (auth, email, password);
            //upload image
            //pending...
            
            //update user for displaname here.. IMPORTANT
            await updateProfile( res.user, {
                displayName
            })
            console.log("created usr =", res.user);

            await setDoc( doc(db, "users", res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: "dp.png",
            } );
            //set user chats document after creating that user woth his uid..
            await setDoc( doc(db, "userChats", res.user.uid), {} );
            alert("User created successfully..");
            navigate("/login");
        }catch(error){
            alert("Error while creating user..");
            console.error("My Data - changed", error);
        }
            
        }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const displayName = e.target[0].value;
    //     const email = e.target[1].value;
    //     const password = e.target[2].value;
    //     const file = e.target[3].files[0];
    //     console.log("filename =", file);
    
    //     const auth = getAuth();
    //     try {
    //         // Create user
    //         const res = await createUserWithEmailAndPassword(auth, email, password);
    
    //         // Upload image through a different CORS proxy
    //     const corsProxyUrl = 'https://api.allorigins.win/raw?url=';
    //     const storageUrl = `https://firebasestorage.googleapis.com/v0/b/whatsup-c51c5.appspot.com/o?name=${displayName}`;
    //     const proxyUrl = `${corsProxyUrl}${encodeURIComponent(storageUrl)}`;
    //     const uploadTask = fetch(proxyUrl, {
    //         method: 'POST',
    //         body: file,
    //         headers: {
    //             'Content-Type': 'image/jpeg', // Adjust content type as needed
    //         },
    //     });
    
    //         console.log("created usr =", res.user);
    //         // console.log("uploaded img =", res.user);
    
    //         uploadTask.then(async (response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to upload image');
    //             }
    
    //             const downloadURL = response.url;
    
    //             // Update user profile and store user data
    //             const update = await updateProfile(res.user, {
    //                 displayName,
    //                 photoURL: downloadURL,
    //             });
    
    //             console.log("update =", update);
    
    //             const setdoc = await setDoc(doc(db, "users", res.user.uid), {
    //                 uid: res.user.uid,
    //                 displayName,
    //                 email,
    //                 photoURL: downloadURL,
    //             });
    
    //             console.log('File available at', setdoc);
    //         }).catch(error => {
    //             alert("Error while uploading image or storing user data.");
    //             console.error("My Data - changed", error);
    //         });
    
    //     } catch (error) {
    //         alert("Error while creating user..");
    //         console.error("My Data - changed", error);
    //     }
    // }
    
    

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">What's Up</span>
                <span className="title" >Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="User Name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{display: 'none'}} id="file" type="file" />
                    <label htmlFor="file" >
                        <img src={uploadIcon} alt=""  />
                        <span >Add an Avatar</span>
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an Account? <a href="/login" >Login Instead</a> </p>
            </div>  
        </div>
    );
}

export default Register;