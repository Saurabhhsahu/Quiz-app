import { useState } from 'react'
import './App.css'
import { Quiz } from './components/quiz/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{height:'100vh'}}>
        <Quiz/>
    </div>
  )
}

export default App
