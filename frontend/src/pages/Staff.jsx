import React from 'react'
import Sidebar from '../components/Navigation/Sidebar'
import Layout from '../components/Layout/Layout'
import StaffTable from '../components/Tables/StaffTable'
import Niel from '../components/Tables/Niel'

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
