import React from 'react';

const style = {
  marginTop: '10px',
  width: '300px',
  height: '40px',
  backgroundColor: 'white',
  position: 'relative',
      left: '865px',
}
const buttonStyle = {
  position: 'relative',
      left: '866px'
}
const Search = ({ changeInput, searchUser, value }) => {
  
  return (
    <div className='search-div'>
   <input type="text" className="search-bar" style={style} placeholder="Find a Player..." value={value} onChange={(e) => changeInput(e.target.value)}/>
   <button className="button-search" style={buttonStyle} onClick={() => searchUser(value)}> Search </button>
  </div>
  )
}

export default Search;
