import React, { useState, useEffect } from 'react'
import axios from 'axios';


const ChangePic = ({ user }) => {

const [imageSelected, setImageSelected] = useState(null);

  const uploadImage = () => {
  
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'Casino');

    axios.post('https://api.cloudinary.com/v1_1/bford002/image/upload', formData)
    .then((res) => {
      axios.put(`/routes/userDatabase/users/${user.id}`, {
        users: {
          picture: res.data.url
        }
      })
    })
    .then(() => {
      alert('New Profile Image Set!')
    })
  };

  const makeDefault = () => {
    const defaultUrl = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';
    axios.put(`/routes/userDatabase/users/${user.id}`, {
      users: {
        picture: defaultUrl
      }
    })
    .then(() => {
      setImageSelected(defaultUrl)
    })
    .then(() => {
      alert('Default Image Set!')
    })
  };


  const onImageChange = (e) => {
    setImageSelected(e.target.files[0]);
  }



  return (
    <div>

      <div>
      <input
        type='file'
        onChange={onImageChange}
        />
        <button style={{marginRight: '50px'}} onClick={uploadImage}>Upload Image</button>
      </div>
      
        <button style={{ fontSize: '9px'}} onClick={makeDefault}>Set Default Image</button>
    </div>
  )
}

export default ChangePic;
