import React from 'react';
import axios from 'axios';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      clientId: ''
    };
  }

  componentDidMount() {
    
    axios.get('/routes/clientId')
      .then(data => {
        
        const {CLIENT_ID} = data.data.parsed; //pull out the ID 
        this.setState({
          clientId: CLIENT_ID,
          display: true
        });
      });
  }
  render() {
    const {changeRender} = this.props;
    
    return (
      <div>login goes here
        
        <a href='http://localhost:1337/google'>GOOGLE</a>
        <button onClick={()=> changeRender('blackjack')}>test changeRender to blackjack</button>
      </div>
    );
  }
  
  
}
export default Login;