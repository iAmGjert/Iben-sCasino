import React, { useState, useEffect } from 'react'
import ThemeContext, { themes } from '../theme-context.js';

const ChangeTheme = ({ user, toggleTheme }) => {

  const [theme, setTheme] = useState(themes.dark);

  // const toggleTheme = () => {
  //   if (theme === themes.dark) {
  //     setTheme(themes.light);
  //   } else {
  //     setTheme(themes.dark);
  //   }
  // }

  return (
    <div>
      <button onClick={toggleTheme}>Change Theme</button>
      </div>
  )
}

export default ChangeTheme;
