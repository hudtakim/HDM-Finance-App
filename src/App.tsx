import './App.css'
import { useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Pages/LandingPage/LandingPage'
import AddTransaction from './Pages/AddTransaction/AddTransaction'
import History from './Pages/History/History'

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Landing Page');

  const GetPageComponent = () => {
    if(currentPage === 'Landing Page'){
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
      <Navbar />
      {GetPageComponent()}
    </>
  )
}

export default App
