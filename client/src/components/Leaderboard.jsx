import React, {Component} from "react";
import axios from 'axios'
class Leaderboard extends Component {
 constructor(props){
   super(props);
   this.state = {
     players: []
   }

 }

 getPlayers() {
  axios.get('/routes/userDatabase/users/leaderboard')
  .then(players => {
    console.log(players);
    this.setState({
      players: players.data
    })
  })
 }

 componentDidMount() {
this.getPlayers();
 }
  render() {
    const { players } = this.state;
    return (
      <div>
        <h5> Black Jack Leaderboard </h5>
        <div className='card'>
          <div className='card-body'>
            <table className="table-boarder"> 
            <col style={{width: '10%'} } />
            <col style={{width: '80%'} } />
            <col style={{width: '10%'} } />
           <tbody>
         {
           players.map((player, i) => {
             return (

<tr key={player.id}>
               <td className="border-0">
                 <b className={i + 1===1 ||i + 1===2 || i + 1===3 ? 'text-danger' : '' } > {i + 1===1 ? '1st' : i + 1===2 ? '2nd' : i + 1===3 ? '3rd' : i + 1}
                 </b>
                 </td>
               <td className="border-0">
                 <div className="d-flex"> 
                 <img src={player.picture} style={{width: "50px", height: "50px", borderRadius: '50%' }} alt="image-thumbnail" />
                 <div className="align self-center p1-3">
                   <span className="font-weight-bold">{player.name}</span>
                 </div>
                 </div>
               </td>
               <td className="border-0"><b className="text-danger">${player.money} </b></td>
             </tr>

             )
           })
         }
             
           </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Leaderboard;