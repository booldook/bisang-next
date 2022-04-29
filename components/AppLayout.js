import React from 'react';
import HeaderCp from './HeaderCp';




const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <HeaderCp />
      { children }
    </div>
  )
}

export default AppLayout