import React from 'react'; 
import FollowButton from './FollowButton.jsx';
const stylePreview = {
  position: 'relative',
  left: '880px',
  fontFamily: 'Merriweather Sans, sans-serif',
  fontSize: '20px',
  color: 'black',
  padding: '10px',
  fontWeight: '900',
  position: 'relative',
  left: '850px',
};
const imgStyle = {
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '5px',
  width: '80px',
  height: '80px',
  position: 'relative',
  left: '880px',
};

const UserPreview = ({userSearched, addFriend }) => { 
  return (
    <div className='preview' style={{backgroundColor: 'white', border: '3px solid', }}>
      {
        userSearched.map( user => (
          <div key={user.id}>
            <img className='user-picture' src={user.picture} style={imgStyle}/>
            <div style={stylePreview}>{user.name} <br />
              <span>Email: {user.email} <FollowButton user={user} addFriend={addFriend} /> </span>
            </div>
          </div>
        )
        )
      }
      
    </div>
  );
};

export default UserPreview;