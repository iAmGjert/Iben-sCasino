import React from 'react'


const ChangeTheme = ({ user, toggleTheme }) => {

  return (
    <div>
      <button onClick={toggleTheme}>{user.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</button>
      </div>
  )
}

export default ChangeTheme;
