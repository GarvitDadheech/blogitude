import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AllBlogs } from './pages/AllBlogs'
import { Blog } from './pages/Blog'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/signup' element={<Signup/>}/>
        <Route path='signin' element={<Signin/>}/>
        <Route path='/blogs' element={<AllBlogs/>}/>
        <Route path='blog' element={<Blog title={"This is the blog"} content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem labore expedita quis earum odit, sint cupiditate. Consequuntur, repellat maiores qui sapiente libero aperiam quis eveniet vel voluptatibus? Esse maiores at atque corrupti cum quo accusantium debitis porro quam excepturi, ipsa exercitationem doloremque molestias autem quis. Earum deleniti, libero harum ut esse dignissimos voluptas culpa nisi tenetur aperiam doloremque quisquam quaerat placeat!"} date={"13-23-24"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
