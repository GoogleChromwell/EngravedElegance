import React from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function HeaderBar() {
  return (
    <div className='flex justify-between items-center px-6 py-4 shadow-md mt-4 mb-8'>
      <h1 className='text-[25px] font-poppins font-bold'>Customer Management</h1>

      <div className='flex items-center gap-7'>
        <button className='p-2 bg-white rounded-custom-xs shadow hover:bg-gray-400'>
          <MessageOutlinedIcon />
        </button>
        <button className='p-2 bg-white rounded-custom-xs shadow hover:bg-gray-400'>
          <NotificationsOutlinedIcon />
        </button>

        <button className='flex items-center gap-2 p-2 rounded'>
          <div className='p-5 rounded-full bg-gray-400' />
          <div className='text-[10px] text-left'>
            <div>Cromwell Naval</div>
            <div className='text-[10px] text-gray-600'>Admin</div>
          </div>
        </button>
      </div>
    </div>
  );
}
