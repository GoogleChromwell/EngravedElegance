import React from 'react'
import Layout from '../components/Layout/Layout'
import StaffTable from '../components/Tables/StaffTable'


export default function Staff() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col">
           <StaffTable/>
        </div>
      </Layout>
    </div>
  )
}
