import React, {Component} from "react";
import axios from "axios";

class FollowingBar extends Component  {
 constructor(props){
   super(props);
   this.state = {
       friends: [],
       hover: false
   };
   this.getFriends = this.getFriends.bind(this);
 }

 handleMouseEnter(e) {
   
   this.setState({ hover: true})
 }
 handleMouseLeave() {
  this.setState({ hover: false})
}
 getFriends(){
  const { currentUser } = this.props;
  // console.log(currentUser);
  axios.get(`/routes/userDatabase/friends/${currentUser.id}`)
  .then(data => {
     console.log(data);
    // this.setState({
    //   friends: friend,
    // })
  })
}
componentDidMount(){
  this.getFriends();
}
  render(){

    const SidebarData = [
      {
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHH4XQ0CG0o5Msww62eqifaQ43TIxnBe3FQ&usqp=CAU',
        userName: 'Maason Smith'
      },
    {
         picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHH4XQ0CG0o5Msww62eqifaQ43TIxnBe3FQ&usqp=CAU',
         userName: 'Maason Smith'
       },
     ]
     
    return (
      <div className='following-bar' style={{height: '200%',width: '300px', backgroundColor: "#2F4050", marginTop: '20%'}}>
        <ul className="list-bar" style={{height: 'auto', padding: '0', width: '100%'}}>
        <h5 className='following-header'>Following </h5>
      {SidebarData.map((val, key) => {
          return (
            <li key={key} className='row' style={{height: '60px', width: '100%', listStyleType: 'none', margin: '0%', display: 'flex', flexDirection: 'row', color: 'white', fontFamily: 'trebuchet ms, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Ariel, sans-serif ', }}> 
        
            <img src={val.picture} style={{height: '66', width: '66px', flex: '30%', display: 'grid', placeItems: 'center', borderRadius: '50%', backgroundSize: 'cover', boxShadow: 'black 10px 10px 10px'}} /> 
            <div style={{flex: '70%'}}>{val.userName}</div>
            </li>
          )
      })}
      </ul>
      </div>
    )
}
}

export default FollowingBar;