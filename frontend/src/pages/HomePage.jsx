import React from 'react'
import Login from '../components/Authentication/Login'
import Sidebar from '../components/Navigation/Sidebar'
import Layout from '../components/Layout/Layout'
import Categories from '../components/Homepage/Categories'

export default function HomePage() {
  return (
    <>
      <Layout>
        <div className="flex">
            <Categories/>
        </div>
      </Layout>
    </>
  )
}
