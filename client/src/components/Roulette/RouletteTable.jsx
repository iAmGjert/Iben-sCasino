import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';

const RouletteTable = ( {bets, setBets} ) => {
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const addBet = (segment) => {
    const tempObj = Object.assign(bets);
    tempObj[segment] ? tempObj[segment] += 10 : tempObj[segment] = 10;
    setBets(tempObj);
  };
  const subBet = (segment) => {
    const tempObj = Object.assign(bets);
    tempObj[segment] > 0 ? tempObj[segment] -= 10 : tempObj[segment] = 0;
    setBets(tempObj);
  };
  return (
    <div>
      <Grid 
        container
        alignContent='center' 
        spacing={1}
        justifyContent='center'
        alignItems='center' 
      >
        
        {
          segments.sort((a, b)=>(parseInt(a) - parseInt(b))).map((segment, index)=>{
            return <Grid 
              container
              alignContent='center' 
              spacing={0}
              justifyContent='center'
              alignItems='center' 
              key={`segButton${index}`} 
              item xs={12} sm={6} md={3}
            >
              <div>
                <Paper>
                
                  <Button 
                    variant='contained'
                    onClick={ () => { addBet(segment); } }
                    color='success'
                  >
                  +
                  </Button>
                  {`      ${segment}      `}
                  <Button 
                    variant='contained'
                    onClick={ ()=>{ subBet(segment); } }
                    color='error'
                  >
                  -
                  </Button>
                </Paper>
              </div>
            </Grid>;
          })
        }
      </Grid>
    </div>
  );
};

export default RouletteTable;