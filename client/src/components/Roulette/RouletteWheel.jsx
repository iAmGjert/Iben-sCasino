import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

const RouletteWheel = () => {
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const segColors = [
    'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'green', 'black', 'red', 'black',
    'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red'
  ];
  const onFinished = (winner) => {
    console.log(winner);
    setWinningSegment(segments[Math.floor(Math.random() * segments.length)]);
  };
  const [winningSegment, setWinningSegment] = useState(segments[Math.floor(Math.random() * segments.length)]);
  
  return (
    <WheelComponent
      segments={segments}
      segColors={segColors}
      winningSegment={winningSegment}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin!'
      isOnlyOnce={true}
      size={200}
      upDuration={50}
      downDuration={400}
      fontFamily='Arial'
    />
  );
};


export default RouletteWheel;