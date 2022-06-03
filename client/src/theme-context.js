import React from 'react';

export const themes = {
  dark: {
    color: 'white',
    background: 'black',
    padding: '10px',
    textShadow: '0px 0px 4px #fff, 1px 1px 2px black, 0px 0px 1px red',
    textAlign: 'center',
    fontWeight: '900',
  },
  light: {
    color: 'black',
    background: 'white',
    padding: '10px',
    textShadow: '0px 0px 4px #fff, 1px 1px 2px black, 0px 0px 1px red',
    textAlign: 'center',
    fontWeight: '900',
  }
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;
