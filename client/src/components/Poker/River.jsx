import React from 'react';

//this component displays when on the River.  its main purpose is for the function called in component did mount to initiate dealing the River card
class River extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render () {
    return River(<div>River</div>);
  }
}

export default River;