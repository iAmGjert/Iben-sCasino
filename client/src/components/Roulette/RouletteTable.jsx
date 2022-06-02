import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';

const RouletteTable = () => {
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const segColors = [
    'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'green', 'black', 'red', 'black',
    'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red'
  ];
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  }));
  const GridItem = ({ classes }) => {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={12} sm={6} md={3} lg={1}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
    );
  };
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={1}>
        {
          segments.sort((a, b)=>(parseInt(a) - parseInt(b))).map((segment)=>{
            return <Grid item xs={12} sm={6} md={3} lg={1}>
              <Paper>
                <Button variant='text'>
                  { segment }
                </Button>
              </Paper>
            </Grid>;
          })
        }
      </Grid>
    </div>
  );
};

export default RouletteTable;