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
  marginTop: '-8px',
  fontSize: '12px',
  position: 'relative', 
      left: '866px'
}
const headerStyle = {
  fontSize: '50px',
      fontWeight: 'bold',
      color: '#77D970',
      textShadow: '2px 2px 4px #000000',
  position: 'relative',
      left: '865px',
}
const Search = ({ changeInput, searchUser, value }) => {
  
  return (
    <div className='search-div' style={{backgroundColor: "#FFBE0F", marginTop: "-250px"}}>
      <h5 style={headerStyle}>Look for a Player </h5>
   <input type="text" className="search-bar" style={style} placeholder="Find a Player..." value={value} onChange={(e) => changeInput(e.target.value)}/>
   <a className="waves-effect purple btn" style={buttonStyle} onClick={() => searchUser(value)}> Search </a>
  </div>
  )
}
 
export default Search;
