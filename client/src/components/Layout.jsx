
import React, { useContext } from 'react'
import ThemeContext from '../theme-context.js';

const Layout = () => {

  const theme = useContext(ThemeContext);

  return (
    <div style={theme}>
      {JSON.stringify(theme)}
      </div>
  )
}

export default Layout;
