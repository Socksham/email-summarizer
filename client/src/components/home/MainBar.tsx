import { collection, query, where, getDocs, Query, DocumentData, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import React, { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import Email from './Email';
import { useAuth } from "../../context/AuthContext";
import { EmailTypeArr } from "../../types/EmailType";
import { EmailType } from "../../types/EmailType";

import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const selectedEmails = new Set<string>()

function checkedCallback(id: string, whether: boolean) {
    if (whether) {
        console.log("Added", id)
        selectedEmails.add(id)
    } else
        selectedEmails.delete(id)
}

function deleteEmails() {
    for (const e of selectedEmails) {
        deleteDoc(doc(db, "inbox", e))
    }
}

interface MainBarProps {
    setSelected: (email: EmailType) => void;
}
const MainBar: React.FC<MainBarProps> = ({ setSelected }) => {

    const { user, loading } = useAuth();

    const [emails, setEmails] = useState<EmailTypeArr>([]);

    useEffect(() => {
        if (!loading) {
            if (user) {
                console.log("Getting emails for", user.email)
                const q = query(collection(db, "inbox"), where("receiverEmail", "==", user.email));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const emails = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        console.log(doc.id, " => ", data);
                        return {
                            id: doc.id, // Need an ID to delete
                            content: data.content,
                            receiverEmail: data.receiverEmail,
                            senderEmail: data.senderEmail,
                            subject: data.subject,
                            timestamp: data.timestamp,
                        }
                    });
                    setEmails(emails)
                });
                return () => {
                    unsubscribe();
                };
            }
        }
    }, [user, loading]);

    return (
        <div className='w-4/12 border-r max-h-screen'>
            <div className='w-full px-6 py-[14px]'>
                <Stack direction="row">
                    <div className="relative text-green-500 block">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-5"
                        >
                            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                        </svg>

                        <input type="email" name="email" id="email" placeholder="Search all emails" className="form-input py-2 px-4 bg-neutral-900 placeholder-green-500 text-green-500 appearance-none w-full block pl-14 focus:outline-none rounded-lg" />
                    </div>
                    <IconButton onClick={() => deleteEmails()}><DeleteIcon /></ IconButton>
                </Stack>
            </div>
            <div className='h-1 border-b' />
            <div className='max-h-full overflow-clip'>
                {
                    emails.map((email, index) => {
                        const {
                            id,
                            content,
                            receiverEmail,
                            senderEmail,
                            subject,
                            timestamp
                        } = email;
                        return (
                            <div key={index} onClick={() => setSelected(email)}>
                                <Email id={id}
                                content={content}
                                receiverEmail={receiverEmail}
                                senderEmail={senderEmail}
                                subject={subject}
                                timestamp={timestamp}
                                checkedCallback={checkedCallback}
                            />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainBar
