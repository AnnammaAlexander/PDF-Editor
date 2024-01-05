
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
// import Login from './assets/component/Auth/Login'
import LoginPage from './assets/pages/LoginPage'
import Signup from './assets/component/Auth/Signup'
import HomePage from './assets/pages/HomePage'
import { useSelector } from 'react-redux'
function App() {
  const reduxToken = useSelector((store: { user: { token: string } }) => store.user.token)


  return (
   <BrowserRouter>
   <ThemeProvider>
    <Routes>
      <Route path ='/' element={reduxToken?<HomePage/>:<LoginPage/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
       <Route path ='/pgflist' element={<HomePage/>}></Route> 
      
    </Routes>
   </ThemeProvider>
   </BrowserRouter>
  )
}

export default App
