import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AllBlogs } from './pages/AllBlogs'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='signin' element={<Signin/>}/>
        <Route path='/blogs' element={<AllBlogs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
