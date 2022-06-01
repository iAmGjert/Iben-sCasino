import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const RouletteTable = () => {

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
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
    );
  };
  const classes = useStyles();
  return (
    <div>
      <h3> Working on responsive roulette grid </h3>
      // I am a container Grid with 1 (8px) spacing
      <Grid container spacing={1}>
        <GridItem classes={classes} />
        <GridItem classes={classes} />
        <GridItem classes={classes} />
        <GridItem classes={classes} />
      </Grid>
    </div>
  );
};

export default RouletteTable;