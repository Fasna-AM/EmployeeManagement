
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Landing from './Landing'
import Home from './Home'
import Update from './Update'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/update/:id' element={<Update/>}/>

    </Routes>
    </>
  )
}

export default App
