import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

const Compose = () => {

    const { user, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const sendEmail = async () => {
        if (!loading) {
            if (user) {
                let myuuid = crypto.randomUUID();

                await setDoc(doc(db, "inbox", myuuid), {
                    senderEmail: user?.email,
                    receiverEmail: email,
                    body: body,
                    subject: subject,
                    timestamp: serverTimestamp()
                });

                setEmail("");
                setSubject("");
                setBody("");
            }
        }
    }

    return (
        <div className='w-full flex flex-col space-y-2'>
            <input
                className='w-full bg-neutral-900 text-white py-1 px-2 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className='w-full bg-neutral-900 text-white py-1 px-2 outline-none'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
            />
            <textarea
                className='w-full bg-neutral-900 text-white py-1 px-2 outline-none'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
            />
            <div className='bg-green-500 w-full px-2 py-1 rounded-md text-center text-white' onClick={sendEmail}>
                <p>Send</p>
            </div>
        </div>
    )
}

export default Compose