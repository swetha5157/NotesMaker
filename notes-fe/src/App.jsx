import {BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import SigninPage from './pages/signinPage'
import DashBoard from './pages/dashboard'
import CreatePage from './pages/createPage'
import DeletePage from './pages/deletePage'
import UpdatePage from './pages/updatepage'


function App(){
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<SigninPage/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/create" element={<CreatePage/>}/>
      <Route path="/delete/:id" element={<DeletePage/>}/>
      <Route path="/update/:id" element={<UpdatePage/>}/>

     </Routes>
     </BrowserRouter> 
       
    </>
  )
}

export default App
