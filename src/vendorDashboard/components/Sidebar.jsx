import React from 'react'

const Sidebar = ({showAddFirmHandler,showAddPoductsHandler,showAllProductsHandler,showFirmTitle}) => {
  return (
    <div className="sideBarSection">
        <ul>
          {showFirmTitle? <li onClick={showAddFirmHandler}>ADD FIRM</li>:"" }
            
            <li onClick={showAddPoductsHandler}>ADD PRODUCT</li>
            <li onClick={showAllProductsHandler}>ALL PRODUCTS</li>
            <li>USER DETAILS</li>
        </ul>
    </div>
  )
}

export default Sidebar