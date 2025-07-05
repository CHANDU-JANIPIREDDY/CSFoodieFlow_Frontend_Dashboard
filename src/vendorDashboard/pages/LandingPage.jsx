import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Home from '../components/Home';
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const[showLogin,setShowLogin]=useState(false);
  const[showRegister,setShowRegister]=useState(false);
  const[showAddFirm,setShowAddFirm] = useState(false);
  const[showAddProducts,setShowAddProducts]=useState(false);
  const[showHome,setShowHome]=useState(false)
  const[showAllProducts,setShowAllProducts]=useState(false);
  const[showLogOut,setShowLogOut] = useState(false);
  const[showFirmTitle,setShowFirmTitle]= useState(true)


  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogOut(true); 
    }
  },[])
  useEffect(()=>{
    const firmname = localStorage.getItem('firmname');
    if(firmname){
      setShowFirmTitle(false);
    }
  },[])

const logOutHandler = () => {
  const isConfirmed = confirm("Are you sure to logout?");
  if (!isConfirmed) return;

  localStorage.removeItem("loginToken");
  localStorage.removeItem("firmId");
  localStorage.removeItem("firmname");

  // Reset all view states
  setShowLogin(false);
  setShowRegister(false);
  setShowAddFirm(true);       // Show AddFirm after logout
  setShowAddProducts(false);
  setShowHome(false);
  setShowAllProducts(false);
  setShowLogOut(false);
  window.location.reload();

};

  const showLoginHandler = ()=>{
    setShowLogin(true);
    setShowRegister(false)
    setShowAddFirm(false)
    setShowAddProducts(false)
    setShowHome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler=()=>{
    setShowRegister(true);
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProducts(false)
    setShowHome(false)
    setShowAllProducts(false)
  }
   const showAddFirmHandler=()=>{
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false)
    setShowAddFirm(true)
    setShowAddProducts(false)
    setShowHome(false)
    setShowAllProducts(false)
    }else{
      alert('Please Login');
      setShowLogin(true);
    }
  }
   const showAddPoductsHandler=()=>{
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProducts(true)
    setShowHome(false)
    setShowAllProducts(false)
  }else{
    alert('Please Login');
    setShowLogin(true);
  }
  }
    const showHomeHandler=()=>{
    setShowRegister(false);
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProducts(false)
    setShowHome(true)
    setShowAllProducts(false)
  }
    const showAllProductsHandler=()=>{
      if(showLogOut){
    setShowRegister(false);
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProducts(false)
    setShowHome(false)
    setShowAllProducts(true)}
    else{
      alert('Please Login');
      setShowLogin(true);
    }
  }
  return (
    <>
        <section className='landingsection'>
            <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} 
            showLogOut={showLogOut} logOutHandler={logOutHandler}/>
            <div className="authForms">
              <Sidebar showAddFirmHandler={showAddFirmHandler} showAddPoductsHandler={showAddPoductsHandler} showAllProductsHandler={showAllProductsHandler}
              showFirmTitle={showFirmTitle}/>
              {showLogin && <Login showHomeHandler={showHomeHandler} setShowLogOut={setShowLogOut} />}
              {showRegister && <Register showLoginHandler={showLoginHandler}/>}
              {showAddFirm && showLogOut && <AddFirm/>}
              {showAddProducts && showLogOut &&<AddProduct/>}
              {showHome && <Home/>}
              {showAllProducts && showLogOut &&<AllProducts/>}
            </div>
        </section>
    </>
  )
}

export default LandingPage