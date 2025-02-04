import React from 'react';
import logo from '/chef-claude-icon.png'

const Header: React.FC = () => {
  return (
    <header className='Header'>
      <img className="Header__logo-img" src={logo} alt="" />
      <h1 className="Header__logo-text">Chef AI</h1>
    </header>
  )
}

export default Header