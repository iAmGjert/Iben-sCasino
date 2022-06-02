import React from 'react';
import styled from 'styled-components';
const MatchStyles = styled.div`
  .match {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .match:hover {
    border: 2px solid black;
  }

  .matchImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .matchNet {
    font-weight: 500;
    font-size: 30px;
    margin-right: 40px;
    color: red;
  }

  .matchNet.win {
    font-weight: 500;
    font-size: 30px;
    margin-right: 40px;
    color: green;
  }
  .matchPlayed {
    font-size: 12px;
  }
  .gameType {
    font-weight: 500;
    font-size: 30px;
    margin-right: 40px;
  }
`;

//Img for either win or loss
// net Earnings
// X  hours ago
const Match = ({ match, win }) => {
  return (
    <MatchStyles>
      <div className='match'>
        {/* Dynamically change based on net profit */}
        <img
          className='matchImage'
          src={
            win
              ? 'https://www.woodsvillehighschool.com/wp-content/uploads/2018/10/win.png'
              : 'https://www.clipartmax.com/png/full/251-2513174_grief-loss-portrait-of-a-man.png'
          }
        />
        {/* Red or Green text depending on netEarings */}
        <span className={win ? 'matchNet win' : 'matchNet'}>
          {win ? '+' + match.netEarnings : match.netEarnings}
        </span>
        <span className='gameType'>Poker</span>
        <span className='matchPlayed'>{match.createdAt}</span>
      </div>
    </MatchStyles>
  );
};

export default Match;
