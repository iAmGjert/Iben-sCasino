import React from 'react';

const Search = ({ changeInput, searchUser, value }) => {

  return (
    <div className='search-div'>
   <input type="text" className="search-bar" value={value} onChange={(e) => changeInput(e.target.value)}/>
   <button className="button-search" onClick={() => searchUser(value)}> Search </button>
  </div>
  )
}

export default Search;
