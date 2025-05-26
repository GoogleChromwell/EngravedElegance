import { useState } from 'react'
import './index.css'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
