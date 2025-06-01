import React from 'react'
import Login from '../components/Authentication/Login'
import Sidebar from '../components/Navigation/Sidebar'
import Layout from '../components/Layout/Layout'
import Categories from '../components/Homepage/Categories'
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
