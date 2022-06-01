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
    });
  };


  const onImageChange = (e) => {
    setImageSelected(e.target.files[0]);
  }


  return (
    <div>
      <input
        type='file'
        onChange={onImageChange}
        />
        <button onClick={uploadImage}>Upload Image</button>
    </div>
  )
}

export default ChangePic;
