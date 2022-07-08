import React from 'react';
import axios from 'axios';
const FontAwesome = require('react-fontawesome');

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

    const style = {
      backgroundColor: '#35654d',
      padding: '10px',
      
      textAlign: 'center',
      fontWeight: '900',
      
    };
    const headerStyle = {
      fontSize: '180px',
      textShadow: '2px 2px 5px #ffff00',
    };
    const inlineStyle = {
      marginTop: '7px',
      marginRight: '8px'
    };
    return (
      <div style={style}>
        <h1 style={headerStyle}>Iben's Casino</h1>
        <div className="col s12 m6 offset-m3 left-align">
          <a className="oauth-container btn darken-4 white black-text" href='/google' style={{textTransform: 'none'}}>
            <div className="left">
              <img width="20px" style={inlineStyle} alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            </div>
        Login with Google
          </a>
        </div>
      </div>
    );
  }
  
  
}
export default Login;

 