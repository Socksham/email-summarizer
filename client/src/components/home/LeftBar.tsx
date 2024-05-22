import React, { useState } from 'react'
import Compose from '../sendmail/Compose';
import { Dialog} from '@mui/material';
import EmailWriter from "./EmailWriter";

const LeftBar = () => {

    const [compose, setCompose] = useState(false);

    return (
        <div className='border-r bg-black w-3/12'>
            <div className='px-12 py-4 flex items-center justify-center'>
                <p className='text-3xl text-white'>Email System</p>
            </div>
            <div className='h-1 border-b' />
            <div className='p-6'>
                <div>
                    <p className='text-2xl text-white'>Inbox</p>
                </div>
                <div className='h-2'/>
                <div className='w-full cursor-pointer'>
                    <div className='flex items-center bg-green-500 px-4 py-2 rounded-md space-x-2' onClick={() => {setCompose(!compose)}}>
                        <svg
                            fill="white"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                        >
                            <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                            <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
                            />
                        </svg>
                        <p className='text-white'>Compose</p>
                    </div>
                    <Dialog open={compose}>
                        <EmailWriter compose={setCompose}/>
                    </Dialog>
                </div>
                <div className='h-4' />
                <div className='w-full flex flex-col space-y-1'>
                    <div className='flex items-center bg-neutral-900 px-4 py-2 rounded-md space-x-2'>
                        <svg
                            fill="none"
                            stroke="#4ade80"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                        >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <path d="M22 6l-10 7L2 6" />
                        </svg>
                        <p className='text-green-500'>Primary Mail</p>
                    </div>
                    <div className='flex items-center px-4 py-2 rounded-md space-x-2'>
                        <svg
                            fill="#a3a3a3"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                        >
                            <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                            <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
                            />
                        </svg>
                        <p className='text-neutral-400'>Drafts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
