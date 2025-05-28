import { Form } from 'formik'
import React from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export default function Categories() {
  return (
    <div className='flex flex-col h-full min-h-screen w-full bg-primary-light'>
        <div className='flex p-[10px] justify-center'>
            <div className='flex place-items-center gap-2 '>
                <input type="text" className='border border-black w-full p-[4px] font-poppins text-[12px]' placeholder='Search a product'/>
                
                <FilterAltOutlinedIcon style={{fontSize: "26px"}} className='border border-black p-[1px]'/>

            </div>
        </div>

    </div>
  )
}
