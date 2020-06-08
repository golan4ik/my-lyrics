import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto'
  },
}));

const Content = (props) => {
  const classes = useStyles();

  return (
    <Grid container sx={12} md={8} className={classes.root}>
      <Grid container item sx={12}>
        
      </Grid>
    </Grid>
  );
};

export default Content;
