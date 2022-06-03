import React from 'react'


const ChangeTheme = ({ user, toggleTheme }) => {

  return (
    <div>
      <button onClick={toggleTheme}>Change Theme</button>
      </div>
  )
}

export default ChangeTheme;
