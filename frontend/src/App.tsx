import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AllBlogs } from './pages/AllBlogs'
import { Blog } from './pages/Blog'
import { RecoilRoot } from 'recoil'
import { Publish } from './pages/Publish'
import UserContextProvider from './context/UserContextProvider'
import { UserBlogs } from './pages/UserBlogs'

function App() {

  return (
    <RecoilRoot>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/blogs' element={<AllBlogs/>}/>
            <Route path='/blog/:id' element={<Blog/>}/>
            <Route path='/publish' element={<Publish/>}/>
            <Route path='/user-blogs' element={<UserBlogs/>}/>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </RecoilRoot>
  )
}

export default App
