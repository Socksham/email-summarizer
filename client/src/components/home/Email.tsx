import React, { useEffect } from 'react'
import { EmailType } from '../../types/EmailType';
import Checkbox from '@mui/material/Checkbox';

interface EmailPageProps {
  id: string;
  content: string;
  receiverEmail: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
  checkedCallback: Function;
}

const Email: React.FC<EmailPageProps> = ({ id, content,
  receiverEmail,
  senderEmail,
  subject,
  timestamp, checkedCallback }) => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    checkedCallback(id, !checked)
  };

  return (
    <div className='border p-4 flex items-start space-x-2 cursor-pointer'>
      <Checkbox
        onChange={handleChange}
      />
      <div className=''>
        <p className='text-green-500'>{senderEmail}</p>
        <p className='text-neutral-300'>{subject}</p>
        <p className='text-neutral-500'>{content}</p>
      </div>
    </div>
  )
}

export default Email
