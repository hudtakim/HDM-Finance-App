import './App.css'
import { useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import AddTransaction from './Pages/AddTransaction/AddTransaction'
import History from './Pages/History/History'
import Login from './Pages/Login/Login'

function App() {
  const loginStatus = localStorage.getItem('hdmfinance-login-status');
  const [currentPage, setCurrentPage] = useState<string>(loginStatus === 'true' ? 'Landing Page' : 'Login Page');


  const GetPageComponent = () => {
    if(currentPage === 'Login Page'){
      return (<Login setCurrentPage={setCurrentPage}/>)
    }else if(currentPage === 'Landing Page'){
      return (<LandingPage setCurrentPage={setCurrentPage}/>);
    }else if(currentPage === 'Add Transaction'){
      return (<AddTransaction setCurrentPage={setCurrentPage}/>)
    }else if(currentPage === 'History'){
      return (<History setCurrentPage={setCurrentPage}/>)
    }else{
      return (<h2>#404 Not Found</h2>)
    }
  }

  return (
    <>
      <Navbar pageTitle={currentPage}/>
      {GetPageComponent()}
    </>
  )
}

export default App
