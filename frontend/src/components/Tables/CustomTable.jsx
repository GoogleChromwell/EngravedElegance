import React from 'react';

export default function CustomTable() {
  return (
    <div className='mt-7 px-10'>
      <table className='w-full border-collapse'>
        <thead className='bg-primary-dark font-poppins text-white font-bold'>
          <tr>
            <th className='px-6 py-2'>ID</th>
            <th className='px-6'>Last name</th>
            <th className='px-6'>First name</th>
            <th className='px-6'>Middle I.</th>
            <th className='px-6'>Address</th>
            <th className='px-6'>Contact no.</th>
            <th className='px-6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table */}
        </tbody>
      </table>
    </div>
  );
}
