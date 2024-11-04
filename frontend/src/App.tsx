import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { AllBlogs } from './pages/AllBlogs'
import { Blog } from './pages/Blog'
import { RecoilRoot } from 'recoil'
import { Publish } from './pages/Publish'
import UserContextProvider from './context/UserContextProvider'
import { UserBlogs } from './pages/UserBlogs'
import { UpdateBlog } from './pages/UpdateBlog'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <RecoilRoot>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" replace />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/blogs' element={<ProtectedRoute><AllBlogs/></ProtectedRoute>}/>
            <Route path='/blog/:id' element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
            <Route path='/publish' element={<ProtectedRoute><Publish/></ProtectedRoute>}/>
            <Route path='/user-blogs' element={<ProtectedRoute><UserBlogs/></ProtectedRoute>}/>
            <Route path="/update-blog/:id" element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </RecoilRoot>
  )
}

export default App
