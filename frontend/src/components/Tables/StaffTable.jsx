import React from 'react'

export default function StaffTable() {
  return (
    <div>
       <div className='flex flex-col overflow-auto flex-grow gap-2 p-6'>
      <h1 className='font-bold font-poppins'>Staff List</h1>
      <table className='table-auto h-full  text-center min-h-full font-poppins border border-gray-300 '>
         <thead className='bg-primary-dark font-poppins text-white font-semibold text-[14px]'>
          <tr>
            <th className='px-3 py-2'>ID</th>
            <th>Last name</th>
            <th>First name</th> 
            <th>Middle I.</th>
            <th>Address</th>
            <th>Contact no.</th>
            <th>Monthly Salary</th>
            <th>Actions</th>
            
          </tr>
         </thead>
         <tbody className='text-[12px]'>
          <tr>
            <td className='px-3 py-2'>1</td>
            <td>Vidal</td>
            <td>Rhon-Eric </td>
            <td>C</td>
            <td>Pasong Kawayan II</td>
            <td>09090909</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className='px-3 py-2'>2</td>
            <td>Naval</td>
            <td>Cromwell</td>
            <td>M</td>
            <td>Pasong Kawayan II</td>
            <td>09090923</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='px3 py-2'>3</td>
            <td>Vidal</td>
            <td>Rhon-Eric </td>
            <td>C</td>
            <td>Pasong Kawayan II</td>
            <td>09090909</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className='px-3 py-2'>4</td>
            <td>Vidal</td>
            <td>Rhon-Eric </td>
            <td>C</td>
            <td>Pasong Kawayan II</td>
            <td>09090909</td>
            <td></td>
            <td></td>
          </tr> 
          <tr>
            <td className='px-3 py-2'>5</td>
            <td>Vidal</td>
            <td>Rhon-Eric </td>
            <td>C</td>
            <td>Pasong Kawayan II</td>
            <td>09090909</td>
            <td></td>
            <td></td>
          </tr>
         </tbody>
      </table>
    </div>
    </div>
  )
}
