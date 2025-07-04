import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
  const firmname = localStorage.getItem("firmname");
  return (
    <div className="navsection">
      <div className="company">
        DASHBOARD
      </div>
      <div className="firmname">
        <h6>FirmName : {firmname}</h6>
      </div>
      <div className="userauth">
        {!showLogOut ? <>
         <span onClick={showLoginHandler}>LOGIN /</span>
        <span onClick={showRegisterHandler}>REGISTER</span>
        </> : <span onClick={logOutHandler}>LOGOUT</span> }
       
        
      </div>
    </div>
  )
}

export default Navbar