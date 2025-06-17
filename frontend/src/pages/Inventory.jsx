import React from 'react'
import Layout from '../components/Layout/Layout'
import InventoryTable from '../components/Inventory/InventoryTable'

export default function Inventory() {
  return (
    <div>
      <Layout>
        <InventoryTable/>
      </Layout>
    </div>
  )
}
