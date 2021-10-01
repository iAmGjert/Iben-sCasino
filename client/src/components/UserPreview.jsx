import React from 'react' 
import FollowButton from './FollowButton.jsx'
const UserPreview = ({userSearched }) => {
  console.log(userSearched)
  return (
    <div className='preview'>
      {
        userSearched.map( user => (
    <div key={user.id}>
    <img className='user-picture' src={user.picture}/>
    <div className='user-name'>{user.name}</div>
    <div className='user-email'>{user.email}</div>
  <FollowButton user={user}  />
    </div>
        )
        )
      }
      
    </div>
  )
}

export default UserPreview;