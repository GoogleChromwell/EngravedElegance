import React from 'react'
import Layout from '../components/Layout/Layout'
import Products from '../components/Homepage/Products'

export default function HomePage() {
  return (
    <>
      <Layout>
        <div className="flex flex-col">
            <Products/>
        </div>
      </Layout>
    </>
  )
}
