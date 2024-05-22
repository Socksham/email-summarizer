import React from 'react'
import Avatar from '@mui/material/Avatar';
import Markdown from 'react-markdown'

interface ShowEmailPageProps {
    content: string;
    receiverEmail: string;
    senderEmail: string;
    subject: string;
    timestamp: string;
}

const ShowEmail: React.FC<ShowEmailPageProps> = ({content, receiverEmail, senderEmail, subject, timestamp}) => {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name: string) {
        return {
        sx: {
        bgcolor: stringToColor(name),
            },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const markdown = "Dear Saksham, We hope this email finds you well and thriving in all your endeavors. At Flashcar Audio, we're excited to extend a special invitation to you for our upcoming event that promises to be an electrifying experience for all attendees."

    return (
    <div className='w-5/12 h-full'>
        <div className='px-6 py-[14px] flex justify-end items-center space-x-3'>
            <Avatar {...stringAvatar('Saksham Gupta')} sx={{ width: 40, height: 40 }} />
            <div className='text-white'>
                <p className='font-semibold'>Saksham Gupta</p>
            </div>
        </div>
        <div className='h-1 border-b' />
        <div className='p-6 h-full flex-col space-y-2'>
            <div>
                <p className='text-white'>{senderEmail}</p>
                <p className='text-green-500 text-2xl font-bold'>{subject}</p>
            </div>
            <div className='text-white'>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    </div>
    )
}

    export default ShowEmail