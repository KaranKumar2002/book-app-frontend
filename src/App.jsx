import {Outlet} from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvide } from './context/AuthContext'

function App() {
  

  return (
    <>
    <AuthProvide>
    <NavBar/>
     <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
     <Outlet/>
     </main>
    <Footer/>
    </AuthProvide>
     
    </>
  )
}

export default App
