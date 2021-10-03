import React from 'react' 
import FollowButton from './FollowButton.jsx'
const stylePreview = {
  position: 'relative',
      left: '880px',
}
const imgStyle = {
  border: '1px solid #ddd',
      borderRadius: '50%',
      padding: '5px',
      width: '80px',
      height: '80px',
  position: 'relative',
      left: '880px',
}
const UserPreview = ({userSearched, addFriend }) => { 
  return (
    <div className='preview'>
      {
        userSearched.map( user => (
    <div key={user.id}>
    <img className='user-picture' src={user.picture} style={imgStyle}/>
    <div style={stylePreview}>{user.name} <br />
      
      <span>Email: {user.email} </span> <FollowButton user={user}  addFriend={addFriend} /> 
    </div>
  
    </div>
        )
        )
      }
      
    </div>
  )
}

export default UserPreview;