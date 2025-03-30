import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Taskbar from './components/taskbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="container">
        <Taskbar/>
      </div>
    </>
  )
}

export default App
