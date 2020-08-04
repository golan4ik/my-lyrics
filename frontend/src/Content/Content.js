import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SearchBlock from "../SearchBlock/SearchBlock";
import SearchResults from "../SearchResults/SearchResults";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Content = (props) => {
  const classes = useStyles();

  return (
    <Grid container item justify="center" className={classes.root}>
      <Grid container item xs={12} justify="center" alignContent="flex-start">
        <Grid item xs={12} md={8}>
          <SearchBlock />
        </Grid>
        <Grid item xs={12} md={8}>
          <SearchResults />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Content;
